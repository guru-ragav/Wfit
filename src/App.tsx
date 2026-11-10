import React, { useState, useEffect } from 'react';
import { WFitLanding } from './components/WFitLanding';
import { WFitCrm } from './components/WFitCrm';
import { LoginModal } from './components/LoginModal';
import { 
  UserAccount, Member, MembershipPlan, Invoice, Lead, BiometricLog, 
  PTSession, RenewalTask, AuditLogItem, TrainerProfile 
} from './types';
import { 
  DEMO_ACCOUNTS, 
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
import { Shield, LogIn, LayoutDashboard, Globe, Users, RefreshCw } from 'lucide-react';

export const App: React.FC = () => {
  // Navigation view: 'landing' (public marketing website) or 'crm' (management portal)
  const [currentView, setCurrentView] = useState<'landing' | 'crm'>(() => {
    const saved = localStorage.getItem('wfit_demo_view');
    return (saved === 'crm' ? 'crm' : 'landing');
  });

  // Current active user account
  const [currentUser, setCurrentUser] = useState<UserAccount>(() => {
    const saved = localStorage.getItem('wfit_demo_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fall back to default
      }
    }
    return DEMO_ACCOUNTS[0]; // Default: Owner / Admin
  });

  const [authToken, setAuthToken] = useState<string>(() => {
    return localStorage.getItem('wfit_auth_token') || 'demo-admin-bearer-token-2026';
  });

  // Login Modal state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Persistent Demo Application Data
  const [members, setMembers] = useState<Member[]>(() => {
    const saved = localStorage.getItem('wfit_demo_members');
    return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
  });

  const [plans, setPlans] = useState<MembershipPlan[]>(() => {
    const saved = localStorage.getItem('wfit_demo_plans');
    return saved ? JSON.parse(saved) : INITIAL_PLANS;
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem('wfit_demo_invoices');
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  const [trainers, setTrainers] = useState<TrainerProfile[]>(() => {
    const saved = localStorage.getItem('wfit_demo_trainers');
    return saved ? JSON.parse(saved) : INITIAL_TRAINERS;
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('wfit_demo_leads');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  const [biometricLogs, setBiometricLogs] = useState<BiometricLog[]>(() => {
    const saved = localStorage.getItem('wfit_demo_logs');
    return saved ? JSON.parse(saved) : INITIAL_BIOMETRIC_LOGS;
  });

  const [ptSessions, setPtSessions] = useState<PTSession[]>(() => {
    const saved = localStorage.getItem('wfit_demo_pt_sessions');
    return saved ? JSON.parse(saved) : INITIAL_PT_SESSIONS;
  });

  const [renewals, setRenewals] = useState<RenewalTask[]>(() => {
    const saved = localStorage.getItem('wfit_demo_renewals');
    return saved ? JSON.parse(saved) : INITIAL_RENEWAL_TASKS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    const saved = localStorage.getItem('wfit_demo_audit');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem('wfit_demo_view', currentView);
  }, [currentView]);

  useEffect(() => {
    localStorage.setItem('wfit_demo_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const handleSwitchDemoAccount = (account: UserAccount) => {
    setCurrentUser(account);
    const mockToken = `demo-${account.role.toLowerCase().replace(/[^a-z]/g, '')}-token-${Date.now()}`;
    setAuthToken(mockToken);
    localStorage.setItem('wfit_auth_token', mockToken);
  };

  const handleResetDemoData = () => {
    if (window.confirm('Reset all demo state to original sample data?')) {
      localStorage.removeItem('wfit_demo_members');
      localStorage.removeItem('wfit_demo_plans');
      localStorage.removeItem('wfit_demo_invoices');
      localStorage.removeItem('wfit_demo_trainers');
      localStorage.removeItem('wfit_demo_leads');
      localStorage.removeItem('wfit_demo_logs');
      localStorage.removeItem('wfit_demo_pt_sessions');
      localStorage.removeItem('wfit_demo_renewals');
      localStorage.removeItem('wfit_demo_audit');
      setMembers(INITIAL_MEMBERS);
      setPlans(INITIAL_PLANS);
      setInvoices(INITIAL_INVOICES);
      setTrainers(INITIAL_TRAINERS);
      setLeads(INITIAL_LEADS);
      setBiometricLogs(INITIAL_BIOMETRIC_LOGS);
      setPtSessions(INITIAL_PT_SESSIONS);
      setRenewals(INITIAL_RENEWAL_TASKS);
      setAuditLogs(INITIAL_AUDIT_LOGS);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col font-sans">
      
      {/* =========================================================================
          TOP CLIENT PRESENTATION & DEMO ROLE SWITCHER BAR
          Allows gym owner or client to smoothly test all 4 role perspectives
      ========================================================================= */}
      <div className="bg-[#121212] border-b border-white/10 px-3 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2 z-50 sticky top-0 select-none">
        
        {/* Left: Demo Mode Indicator & View Switcher */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            CLIENT DEMO MODE
          </span>

          <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5">
            <button
              onClick={() => setCurrentView('landing')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                currentView === 'landing'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Globe className="w-3 h-3" />
              <span>Public Website</span>
            </button>
            <button
              onClick={() => setCurrentView('crm')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                currentView === 'crm'
                  ? 'bg-[#1D4ED8] text-white font-semibold shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3 h-3" />
              <span>CRM & Portals</span>
            </button>
          </div>
        </div>

        {/* Center: Quick Demo Role Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          <span className="text-white/50 text-[10px] uppercase font-mono mr-1 hidden sm:inline">Role:</span>
          {DEMO_ACCOUNTS.map((acc) => {
            const isSelected = currentUser.id === acc.id;
            let roleShort: string = acc.role;
            if (acc.role === 'OWNER / ADMIN') roleShort = 'Owner';
            if (acc.role === 'CLUB MANAGER') roleShort = 'Manager';
            if (acc.role === 'TRAINER') roleShort = 'Trainer';
            if (acc.role === 'MEMBER') roleShort = 'Member';

            return (
              <button
                key={acc.id}
                onClick={() => {
                  handleSwitchDemoAccount(acc);
                  setCurrentView('crm');
                }}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-blue-600 text-white font-bold ring-1 ring-blue-400'
                    : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
                title={`Switch role to ${acc.name} (${acc.role})`}
              >
                <span>{roleShort}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Active User & Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-white/80 bg-white/5 px-2 py-1 rounded border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span className="font-semibold text-white truncate max-w-[140px]">{currentUser.name}</span>
            <span className="text-white/50 text-[10px]">({currentUser.role})</span>
          </div>

          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="flex items-center gap-1 px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium transition-colors"
            title="Open Sign In Modal with credentials"
          >
            <LogIn className="w-3 h-3" />
            <span className="hidden sm:inline">Demo Login</span>
          </button>

          <button
            onClick={handleResetDemoData}
            className="p-1 rounded bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            title="Reset sample data"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* =========================================================================
          MAIN APPLICATION VIEW
      ========================================================================= */}
      <main className="flex-1">
        {currentView === 'landing' ? (
          <WFitLanding 
            onOpenCrm={() => setCurrentView('crm')} 
          />
        ) : (
          <WFitCrm
            onBackToLanding={() => setCurrentView('landing')}
            currentUser={currentUser}
            authToken={authToken}
            onLogout={() => {
              setCurrentView('landing');
            }}
            onSwitchDemoAccount={handleSwitchDemoAccount}
            initialPlans={plans}
            initialMembers={members}
            initialInvoices={invoices}
            initialLeads={leads}
            initialLogs={biometricLogs}
            initialPTSessions={ptSessions}
            initialRenewals={renewals}
            initialAuditLogs={auditLogs}
          />
        )}
      </main>

      {/* Demo Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(user, token) => {
          setCurrentUser(user);
          setAuthToken(token);
          setCurrentView('crm');
        }}
      />

    </div>
  );
};

export default App;
