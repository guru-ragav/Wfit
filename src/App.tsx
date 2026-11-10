import React, { useState, useEffect, useCallback } from 'react';
import { WFitLanding } from './components/WFitLanding';
import { WFitCrm } from './components/WFitCrm';
import { LoginPage, AuthPageMode } from './components/LoginPage';
import {
  UserAccount, Member, MembershipPlan, Invoice, Lead, BiometricLog,
  PTSession, RenewalTask, AuditLogItem, TrainerProfile, SystemSettings, UserPermissions
} from './types';
import {
  INITIAL_PLANS,
  INITIAL_MEMBERS,
  INITIAL_INVOICES,
  INITIAL_TRAINERS,
  INITIAL_LEADS,
  INITIAL_BIOMETRIC_LOGS,
  INITIAL_PT_SESSIONS,
  INITIAL_RENEWAL_TASKS,
  INITIAL_AUDIT_LOGS
} from './mockData';
import { GYM_IMAGES } from './assets/images';
import { Dumbbell, Loader2 } from 'lucide-react';

type AppView = 'landing' | 'login' | 'crm';

const TOKEN_STORAGE_KEY = 'wfit_auth_token';

const INITIAL_SYSTEM_SETTINGS: SystemSettings = {
  managerPaymentAccessEnabled: false,
  gymName: 'WFIT GYM',
  primaryBranch: 'Downtown Flagship',
  allowSelfRegistration: true,
  biometricEnforcementActive: true
};

function readStoredJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function getStoredToken(): string {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY) || sessionStorage.getItem(TOKEN_STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

function parseRouteFromLocation(): { view: AppView; authMode: AuthPageMode } {
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  if (path === '/register' || path === '/signup') {
    return { view: 'login', authMode: 'register' };
  }
  if (path === '/forgot-password') {
    return { view: 'login', authMode: 'forgot' };
  }
  if (path === '/login') {
    return { view: 'login', authMode: 'login' };
  }
  if (path === '/crm' || path === '/dashboard' || path === '/portal') {
    return { view: 'crm', authMode: 'login' };
  }
  return { view: 'landing', authMode: 'login' };
}

function resolveDemoPassword(account: UserAccount): string {
  if (account.role === 'OWNER / ADMIN') return 'Admin@WFIT2026!';
  if (account.role === 'CLUB MANAGER') return 'Manager@WFIT2026!';
  if (account.role === 'TRAINER') return 'Trainer@WFIT2026!';
  return 'Member@WFIT2026!';
}

function normalizeServerTrainers(serverTrainers: TrainerProfile[]): TrainerProfile[] {
  return serverTrainers.map((t) =>
    t.id === 'TR-ALEX' ? { ...t, photoUrl: GYM_IMAGES.coachingFeature } : t
  );
}

export const App: React.FC = () => {
  const initialRoute = parseRouteFromLocation();

  const [currentView, setCurrentView] = useState<AppView>(initialRoute.view);
  const [loginInitialMode, setLoginInitialMode] = useState<AuthPageMode>(initialRoute.authMode);

  // Authenticated session state (starts unauthenticated; verified with /api/auth/me)
  const [authToken, setAuthToken] = useState<string>(() => getStoredToken());
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [isRestoringSession, setIsRestoringSession] = useState<boolean>(() => Boolean(getStoredToken()));

  // Lifted application data state shared between Landing, Login/Signup, and CRM
  const [members, setMembers] = useState<Member[]>(() => readStoredJson('wfit_demo_members', INITIAL_MEMBERS));
  const [plans, setPlans] = useState<MembershipPlan[]>(() => readStoredJson('wfit_demo_plans', INITIAL_PLANS));
  const [invoices, setInvoices] = useState<Invoice[]>(() => readStoredJson('wfit_demo_invoices', INITIAL_INVOICES));
  const [trainers, setTrainers] = useState<TrainerProfile[]>(() => readStoredJson('wfit_demo_trainers', INITIAL_TRAINERS));
  const [leads, setLeads] = useState<Lead[]>(() => readStoredJson('wfit_demo_leads', INITIAL_LEADS));
  const [biometricLogs, setBiometricLogs] = useState<BiometricLog[]>(() => readStoredJson('wfit_demo_logs', INITIAL_BIOMETRIC_LOGS));
  const [ptSessions, setPtSessions] = useState<PTSession[]>(() => readStoredJson('wfit_demo_pt_sessions', INITIAL_PT_SESSIONS));
  const [renewals, setRenewals] = useState<RenewalTask[]>(() => readStoredJson('wfit_demo_renewals', INITIAL_RENEWAL_TASKS));
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => readStoredJson('wfit_demo_audit', INITIAL_AUDIT_LOGS));
  const [systemSettings, setSystemSettings] = useState<SystemSettings>(() =>
    readStoredJson('wfit_demo_settings', INITIAL_SYSTEM_SETTINGS)
  );

  // Navigation helper that keeps browser URL synced
  const navigateTo = useCallback((view: AppView, mode?: AuthPageMode, replaceHistory = false) => {
    let targetPath = '/';
    if (view === 'crm') {
      targetPath = '/crm';
    } else if (view === 'login') {
      const nextMode = mode || 'login';
      setLoginInitialMode(nextMode);
      targetPath = nextMode === 'register' ? '/register' : nextMode === 'forgot' ? '/forgot-password' : '/login';
    }

    setCurrentView(view);
    if (window.location.pathname !== targetPath) {
      if (replaceHistory) {
        window.history.replaceState(null, '', targetPath);
      } else {
        window.history.pushState(null, '', targetPath);
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  // Browser back/forward button listener
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseRouteFromLocation();
      setCurrentView(parsed.view);
      setLoginInitialMode(parsed.authMode);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync persistent state changes with localStorage
  useEffect(() => { localStorage.setItem('wfit_demo_members', JSON.stringify(members)); }, [members]);
  useEffect(() => { localStorage.setItem('wfit_demo_plans', JSON.stringify(plans)); }, [plans]);
  useEffect(() => { localStorage.setItem('wfit_demo_invoices', JSON.stringify(invoices)); }, [invoices]);
  useEffect(() => { localStorage.setItem('wfit_demo_trainers', JSON.stringify(trainers)); }, [trainers]);
  useEffect(() => { localStorage.setItem('wfit_demo_leads', JSON.stringify(leads)); }, [leads]);
  useEffect(() => { localStorage.setItem('wfit_demo_logs', JSON.stringify(biometricLogs)); }, [biometricLogs]);
  useEffect(() => { localStorage.setItem('wfit_demo_pt_sessions', JSON.stringify(ptSessions)); }, [ptSessions]);
  useEffect(() => { localStorage.setItem('wfit_demo_renewals', JSON.stringify(renewals)); }, [renewals]);
  useEffect(() => { localStorage.setItem('wfit_demo_audit', JSON.stringify(auditLogs)); }, [auditLogs]);
  useEffect(() => { localStorage.setItem('wfit_demo_settings', JSON.stringify(systemSettings)); }, [systemSettings]);

  // Hydrate public catalog (plans & trainers) from backend on mount
  useEffect(() => {
    let cancelled = false;
    const loadPublicCatalog = async () => {
      try {
        const [plansRes, trainersRes] = await Promise.all([
          fetch('/api/plans'),
          fetch('/api/trainers')
        ]);
        if (!cancelled && plansRes.ok) {
          const data = await plansRes.json();
          if (Array.isArray(data) && data.length > 0) setPlans(data);
        }
        if (!cancelled && trainersRes.ok) {
          const data = await trainersRes.json();
          if (Array.isArray(data) && data.length > 0) setTrainers(normalizeServerTrainers(data));
        }
      } catch {
        // Offline / fallback to cached mockData
      }
    };
    loadPublicCatalog();
    return () => { cancelled = true; };
  }, []);

  // Verify existing auth token against /api/auth/me on mount
  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      setIsRestoringSession(false);
      if (initialRoute.view === 'crm') {
        navigateTo('login', 'login', true);
      }
      return;
    }

    let cancelled = false;
    const verifySession = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Session expired or invalid');

        const data = await res.json();
        if (!cancelled && data.user) {
          setCurrentUser(data.user);
          setAuthToken(token);
          if (data.member) {
            setMembers(prev => {
              const exists = prev.some(m => m.id === data.member.id);
              return exists ? prev.map(m => (m.id === data.member.id ? data.member : m)) : [data.member, ...prev];
            });
          }
        }
      } catch {
        if (!cancelled) {
          localStorage.removeItem(TOKEN_STORAGE_KEY);
          sessionStorage.removeItem(TOKEN_STORAGE_KEY);
          setAuthToken('');
          setCurrentUser(null);
          if (initialRoute.view === 'crm') {
            navigateTo('login', 'login', true);
          }
        }
      } finally {
        if (!cancelled) setIsRestoringSession(false);
      }
    };

    verifySession();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hydrate role-scoped CRM records when signed in as Admin or Manager
  useEffect(() => {
    if (!authToken || !currentUser) return;
    if (currentUser.role !== 'OWNER / ADMIN' && currentUser.role !== 'CLUB MANAGER') return;

    let cancelled = false;
    const syncOperationalData = async () => {
      try {
        const headers = { Authorization: `Bearer ${authToken}` };
        const [memRes, leadsRes, bioRes, renRes, trainersRes, plansRes, settingsRes] = await Promise.all([
          fetch('/api/members', { headers }),
          fetch('/api/leads', { headers }),
          fetch('/api/biometric-logs', { headers }),
          fetch('/api/renewals', { headers }),
          fetch('/api/trainers'),
          fetch('/api/plans'),
          fetch('/api/settings', { headers })
        ]);
        if (!cancelled && memRes.ok) {
          const data = await memRes.json();
          if (Array.isArray(data) && data.length > 0) setMembers(data);
        }
        if (!cancelled && leadsRes.ok) {
          const data = await leadsRes.json();
          if (Array.isArray(data) && data.length > 0) setLeads(data);
        }
        if (!cancelled && bioRes.ok) {
          const data = await bioRes.json();
          if (Array.isArray(data) && data.length > 0) setBiometricLogs(data);
        }
        if (!cancelled && renRes.ok) {
          const data = await renRes.json();
          if (Array.isArray(data) && data.length > 0) setRenewals(data);
        }
        if (!cancelled && trainersRes.ok) {
          const data = await trainersRes.json();
          if (Array.isArray(data) && data.length > 0) setTrainers(normalizeServerTrainers(data));
        }
        if (!cancelled && plansRes.ok) {
          const data = await plansRes.json();
          if (Array.isArray(data) && data.length > 0) setPlans(data);
        }
        if (!cancelled && settingsRes.ok) {
          const data = await settingsRes.json();
          if (data && typeof data.managerPaymentAccessEnabled === 'boolean') setSystemSettings(data);
        }
      } catch {
        // Retain current state gracefully
      }
    };

    syncOperationalData();
    return () => { cancelled = true; };
  }, [authToken, currentUser]);

  // Unified authentication handler used by LoginPage (sign-in, register, reset, demo buttons)
  const handleAuthSuccess = (payload: {
    user: UserAccount;
    token: string;
    permissions: UserPermissions;
    member?: Member;
    rememberMe: boolean;
  }) => {
    const { user, token, member, rememberMe } = payload;

    if (rememberMe) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
      sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    } else {
      sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }

    setAuthToken(token);
    setCurrentUser(user);

    if (member) {
      setMembers(prev => {
        const exists = prev.some(m => m.id === member.id);
        return exists ? prev.map(m => (m.id === member.id ? member : m)) : [member, ...prev];
      });
    }

    navigateTo('crm');
  };

  // Switch between Demo Role Accounts via real POST /api/auth/login
  const handleSwitchDemoAccount = async (account: UserAccount) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: account.email,
          password: resolveDemoPassword(account),
          rememberMe: true
        })
      });
      if (!res.ok) return;
      const data = await res.json();
      localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      sessionStorage.removeItem(TOKEN_STORAGE_KEY);
      setAuthToken(data.token);
      setCurrentUser(data.user);
      if (data.member) {
        setMembers(prev => {
          const exists = prev.some(m => m.id === data.member.id);
          return exists ? prev.map(m => (m.id === data.member.id ? data.member : m)) : [data.member, ...prev];
        });
      }
      navigateTo('crm');
    } catch {
      // Ignore network hiccup
    }
  };

  // Logout cleanly against backend and return to /login
  const handleLogout = async () => {
    const activeToken = authToken || getStoredToken();
    if (activeToken) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${activeToken}` }
        });
      } catch {
        // Clear local session regardless
      }
    }

    localStorage.removeItem(TOKEN_STORAGE_KEY);
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    setAuthToken('');
    setCurrentUser(null);
    navigateTo('login', 'login');
  };

  // Persist public website consultation / enquiry submissions into CRM Leads Pipeline
  const handleSubmitLandingLead = async (input: {
    name: string;
    mobile: string;
    email: string;
    interestedPlan: string;
    message: string;
  }) => {
    const planLower = input.interestedPlan.toLowerCase();
    const interestedProduct: Lead['interestedProduct'] =
      planLower.includes('personal') ? 'Personal Training' :
      planLower.includes('box') ? 'Boxing' :
      planLower.includes('group') || planLower.includes('condition') ? 'Group Classes' :
      'Gym Membership';

    const combinedNotes = `${input.interestedPlan}${input.message ? ` — ${input.message}` : ''}`;

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: input.name,
          mobile: input.mobile,
          email: input.email,
          source: 'Website',
          interestedProduct,
          stage: 'New enquiry',
          notes: combinedNotes
        })
      });
      if (res.ok) {
        const createdLead: Lead = await res.json();
        setLeads(prev => [createdLead, ...prev.filter(l => l.id !== createdLead.id)]);
        return;
      }
    } catch {
      // Fall back to local persistence
    }

    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const fallbackLead: Lead = {
      id: `LEAD-2026-${Math.floor(100 + Math.random() * 900)}`,
      name: input.name,
      mobile: input.mobile,
      email: input.email,
      source: 'Website',
      interestedProduct,
      assignedExecutive: 'Sneha Rao (Front Office)',
      stage: 'New enquiry',
      enquiryDate: today,
      lastContactDate: today,
      nextFollowUpDate: tomorrow,
      notes: combinedNotes
    };
    setLeads(prev => [fallbackLead, ...prev]);
  };

  // Reset cached client demo state to clean sample seed
  const handleResetDemoData = () => {
    if (window.confirm('Reset all local CRM demo state to original sample data?')) {
      [
        'wfit_demo_members',
        'wfit_demo_plans',
        'wfit_demo_invoices',
        'wfit_demo_trainers',
        'wfit_demo_leads',
        'wfit_demo_logs',
        'wfit_demo_pt_sessions',
        'wfit_demo_renewals',
        'wfit_demo_audit',
        'wfit_demo_settings'
      ].forEach(k => localStorage.removeItem(k));

      setMembers(INITIAL_MEMBERS);
      setPlans(INITIAL_PLANS);
      setInvoices(INITIAL_INVOICES);
      setTrainers(INITIAL_TRAINERS);
      setLeads(INITIAL_LEADS);
      setBiometricLogs(INITIAL_BIOMETRIC_LOGS);
      setPtSessions(INITIAL_PT_SESSIONS);
      setRenewals(INITIAL_RENEWAL_TASKS);
      setAuditLogs(INITIAL_AUDIT_LOGS);
      setSystemSettings(INITIAL_SYSTEM_SETTINGS);
    }
  };

  // Protected route fallback: while checking stored token on /crm, show crisp verifying view
  if (currentView === 'crm' && isRestoringSession) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-[#172033] flex flex-col items-center justify-center p-6 font-sans">
        <div className="w-12 h-12 rounded-2xl bg-[#1D4ED8] text-white flex items-center justify-center mb-4 shadow-md">
          <Dumbbell className="w-6 h-6" />
        </div>
        <div className="flex items-center gap-2 text-sm font-bold text-[#172033]">
          <Loader2 className="w-4 h-4 animate-spin text-[#1D4ED8]" />
          <span>Verifying WFIT GYM Session...</span>
        </div>
        <p className="text-xs text-[#5B6475] mt-1 font-mono">Authenticating secure role credentials</p>
      </div>
    );
  }

  // Enforce authentication for CRM views
  if (currentView === 'login' || (currentView === 'crm' && !currentUser)) {
    return (
      <LoginPage
        initialMode={loginInitialMode}
        plans={plans}
        onBackToLanding={() => navigateTo('landing')}
        onModeChange={(nextMode) => {
          setLoginInitialMode(nextMode);
          const nextPath =
            nextMode === 'register' ? '/register' : nextMode === 'forgot' ? '/forgot-password' : '/login';
          if (window.location.pathname !== nextPath) {
            window.history.replaceState(null, '', nextPath);
          }
        }}
        onAuthSuccess={handleAuthSuccess}
      />
    );
  }

  if (currentView === 'crm' && currentUser) {
    return (
      <WFitCrm
        onBackToLanding={() => navigateTo('landing')}
        currentUser={currentUser}
        authToken={authToken}
        onLogout={handleLogout}
        onSwitchDemoAccount={handleSwitchDemoAccount}
        onResetDemoData={handleResetDemoData}
        plans={plans}
        setPlans={setPlans}
        members={members}
        setMembers={setMembers}
        invoices={invoices}
        setInvoices={setInvoices}
        trainers={trainers}
        setTrainers={setTrainers}
        leads={leads}
        setLeads={setLeads}
        biometricLogs={biometricLogs}
        setBiometricLogs={setBiometricLogs}
        ptSessions={ptSessions}
        setPtSessions={setPtSessions}
        renewals={renewals}
        setRenewals={setRenewals}
        auditLogs={auditLogs}
        setAuditLogs={setAuditLogs}
        systemSettings={systemSettings}
        setSystemSettings={setSystemSettings}
      />
    );
  }

  return (
    <WFitLanding
      plans={plans}
      trainers={trainers}
      currentUser={currentUser}
      onOpenCrm={() => {
        if (currentUser && authToken) {
          navigateTo('crm');
        } else {
          navigateTo('login', 'login');
        }
      }}
      onOpenLogin={() => navigateTo('login', 'login')}
      onOpenRegister={() => navigateTo('login', 'register')}
      onLogout={handleLogout}
      onSubmitLead={handleSubmitLandingLead}
    />
  );
};

export default App;
