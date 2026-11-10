import {
  UserProfile,
  WorkoutRoutine,
  ClassSession,
  MembershipPlan,
  NutritionMeal,
  GymTrainer,
  ProgressMetric,
  CheckInLog
} from '../types/wfit';
import { GYM_IMAGES } from '../assets/images';

export const INITIAL_USER: UserProfile = {
  id: 'WF-MDU-8921',
  name: 'Saravanan Pandian',
  phone: '+91 98421 76540',
  email: 'saravanan.p@wfitmadurai.in',
  branch: 'KK Nagar',
  membershipPlan: 'Annual Elite Club Pass',
  membershipExpiry: '2026-11-20',
  streakDays: 14,
  totalWorkouts: 48,
  weightKg: 74.2,
  heightCm: 176,
  targetWeightKg: 70.0,
  waterIntakeMl: 2500,
  waterGoalMl: 3500,
  caloriesBurned: 580,
  caloriesGoal: 700,
  activeWorkoutMinutes: 42,
  workoutGoalMinutes: 60
};

export const INITIAL_WORKOUTS: WorkoutRoutine[] = [
  {
    id: 'wo-1',
    title: 'Madurai Heavy Strength Push',
    titleTa: 'மதுரை ஹெவி ஸ்ட்ரென்த் புஷ்',
    category: 'Strength',
    durationMinutes: 55,
    difficulty: 'Intermediate',
    difficultyTa: 'நடுத்தர நிலை',
    caloriesEstimate: 420,
    description: 'Chest press, overhead shoulder drive, triceps dip superset designed for athletic density.',
    descriptionTa: 'மார்பு மற்றும் தோள்பட்டை தசை வலிமைக்கான முழு உடற்பயிற்சி தொகுப்பு.',
    exercises: [
      { id: 'ex-1', name: 'Barbell Incline Bench Press', nameTa: 'பாார்பெல் இன்க்லைன் பெஞ்ச் பிரஸ்', sets: 4, reps: '8-10 reps', restSec: 90, notes: 'Control 3-sec negative' },
      { id: 'ex-2', name: 'Dumbbell Seated Shoulder Press', nameTa: 'டம்பெல் ஷோல்டர் பிரஸ்', sets: 4, reps: '10-12 reps', restSec: 60, notes: 'Full elbow extension at apex' },
      { id: 'ex-3', name: 'Weighted Cable Chest Flys', nameTa: 'கேபிள் செஸ்ட் ஃப்ளைஸ்', sets: 3, reps: '12-15 reps', restSec: 45, notes: 'Hold contraction for 1 sec' },
      { id: 'ex-4', name: 'Dips & Skull Crushers Superset', nameTa: 'டிப்ஸ் & ஸ்கல் க்ரஷர்ஸ்', sets: 3, reps: '12 reps', restSec: 60, notes: 'Focus on triceps burnout' }
    ]
  },
  {
    id: 'wo-2',
    title: 'Vaigai High-Intensity Interval Burn',
    titleTa: 'வைகை அதிவேக கார்டியோ பர்ன்',
    category: 'HIIT',
    durationMinutes: 35,
    difficulty: 'Advanced',
    difficultyTa: 'மேம்பட்ட நிலை',
    caloriesEstimate: 380,
    description: 'Explosive functional circuits incorporating battle ropes, box jumps, and sled pushes.',
    descriptionTa: 'கொழுப்பை வேகமாக எரிக்கும் ஆற்றல் மிக்க பன்முக கார்டியோ பயிற்சி.',
    exercises: [
      { id: 'ex-5', name: 'Battle Rope Alternating Waves', nameTa: 'பேட்டில் ரோப் அலைகள்', sets: 4, reps: '40 sec on / 20 sec off', restSec: 20, notes: 'Max RPM with tight core' },
      { id: 'ex-6', name: 'Plyometric Plyo Box Jumps', nameTa: 'பிளை மெட்ரிக் பாக்ஸ் ஜம்ப்', sets: 4, reps: '15 explosive jumps', restSec: 30, notes: 'Soft knee landing' },
      { id: 'ex-7', name: 'Prowler Sled Push (80 kg)', nameTa: 'ஸ்லெட் புஷ் (80 கிலோ)', sets: 5, reps: '25m turf dash', restSec: 45, notes: 'Drive through mid-foot' },
      { id: 'ex-8', name: 'Kettlebell Russian Swings', nameTa: 'கெட்டில்பெல் ஸ்விங்ஸ்', sets: 4, reps: '20 swings (24kg)', restSec: 30, notes: 'Snap hips horizontally' }
    ]
  },
  {
    id: 'wo-3',
    title: 'Posterior Chain Deadlift & Pull',
    titleTa: 'முதுகு & கால்கள் பவர் லிஃப்ட்',
    category: 'Strength',
    durationMinutes: 50,
    difficulty: 'Intermediate',
    difficultyTa: 'நடுத்தர நிலை',
    caloriesEstimate: 460,
    description: 'Conventional deadlifts, lat pulldowns, seated cable rows, and hammer curls.',
    descriptionTa: 'முதுகுத்தண்டு மற்றும் பின் தொடை தசைகளை வலுப்படுத்தும் பவர் பயிற்சி.',
    exercises: [
      { id: 'ex-9', name: 'Conventional Deadlift', nameTa: 'டெட்லிஃப்ட் பயிற்சி', sets: 5, reps: '5 reps (Heavy)', restSec: 120, notes: 'Neutral cervical spine' },
      { id: 'ex-10', name: 'Wide Grip Lat Pulldown', nameTa: 'லேட் புல்டவுன்', sets: 4, reps: '10-12 reps', restSec: 60, notes: 'Pull bar to sternum level' },
      { id: 'ex-11', name: 'Chest Supported Row', nameTa: 'செஸ்ட் சப்போர்ட்டட் ரோ', sets: 3, reps: '12 reps', restSec: 60, notes: 'Squeeze rhomboids' },
      { id: 'ex-12', name: 'Incline Dumbbell Bicep Curl', nameTa: 'பைசெப் கர்ல்', sets: 3, reps: '12 reps', restSec: 45, notes: 'Full stretch at bottom' }
    ]
  },
  {
    id: 'wo-4',
    title: 'Temple City Mobility & Breath Yoga',
    titleTa: 'கோயில் நகரம் யோகா & மூச்சுப்பயிற்சி',
    category: 'Yoga',
    durationMinutes: 40,
    difficulty: 'Beginner',
    difficultyTa: 'தொடக்க நிலை',
    caloriesEstimate: 190,
    description: 'Joint decompressions, warrior sequences, hip openers, and restorative pranayama.',
    descriptionTa: 'தசை தளர்வு, நெகிழ்வுத்தன்மை மற்றும் மன அமைதிக்கான ஆசனங்கள்.',
    exercises: [
      { id: 'ex-13', name: 'Surya Namaskar Dynamic Flow', nameTa: 'சூரிய நமஸ்காரம்', sets: 6, reps: 'Complete cycles', restSec: 30, notes: 'Sync inhalation with extension' },
      { id: 'ex-14', name: 'Virabhadrasana (Warrior II)', nameTa: 'வீரபத்ராசனம்', sets: 3, reps: '45 sec hold each side', restSec: 20, notes: 'Square hips forward' },
      { id: 'ex-15', name: 'Deep Pigeon Hip Opener', nameTa: 'கபோதாசனம் (ஹிப் ஸ்ட்ரெட்ச்)', sets: 3, reps: '60 sec hold each side', restSec: 30, notes: 'Breathe into glutes' },
      { id: 'ex-16', name: 'Nadi Shodhana Pranayama', nameTa: 'நாடி சுத்தி பிராணாயாமம்', sets: 1, reps: '7 minutes', restSec: 0, notes: 'Deep nasal resonance' }
    ]
  },
  {
    id: 'wo-5',
    title: 'Fat-Shredding Metabolic Circuit',
    titleTa: 'மெட்டபாலிக் ஃபேட்-ஷிரெட் சர்க்யூட்',
    category: 'Weight Loss',
    durationMinutes: 45,
    difficulty: 'Intermediate',
    difficultyTa: 'நடுத்தர நிலை',
    caloriesEstimate: 510,
    description: 'High cadence multi-joint barbell complexes paired with assault bike sprints.',
    descriptionTa: 'உடலின் கலோரிகளை வேகமாகக் குறைக்கும் கார்டியோ-ஸ்ட்ரென்த் காம்போ.',
    exercises: [
      { id: 'ex-17', name: 'Assault Bike Calorie Sprints', nameTa: 'அசால்ட் பைக் ஸ்பிரிண்ட்', sets: 5, reps: '15 cals in 30 sec', restSec: 45, notes: 'All-out threshold pace' },
      { id: 'ex-18', name: 'Barbell Thrusters (35 kg)', nameTa: 'பாார்பெல் த்ரஸ்டர்', sets: 4, reps: '12 reps', restSec: 45, notes: 'Fluid transition from squat to press' },
      { id: 'ex-19', name: 'Burpee Over Barbell', nameTa: 'பர்பீ ஓவர் பாார்பெல்', sets: 4, reps: '12 reps', restSec: 30, notes: 'Two-foot takeoff jump' },
      { id: 'ex-20', name: 'Hanging Knee Raises', nameTa: 'ஹேங்கிங் நீ ரெய்சஸ்', sets: 3, reps: '15 reps', restSec: 30, notes: 'Tuck pelvis under' }
    ]
  }
];

export const INITIAL_CLASSES: ClassSession[] = [
  {
    id: 'cls-1',
    title: 'CrossFit Madurai Engine',
    titleTa: 'கிராஸ்ஃபிட் மதுரை எஞ்சின்',
    trainer: 'Coach Meenakshi',
    branch: 'KK Nagar',
    day: 'Today',
    time: '06:00 AM - 07:00 AM',
    capacity: 16,
    bookedCount: 12,
    isBooked: true,
    category: 'HIIT'
  },
  {
    id: 'cls-2',
    title: 'Olympic Barbell & Hypertrophy',
    titleTa: 'ஒலிம்பிக் பாார்பெல் & வலிமை',
    trainer: 'Coach Karthik Raj',
    branch: 'KK Nagar',
    day: 'Today',
    time: '07:30 AM - 08:30 AM',
    capacity: 12,
    bookedCount: 11,
    isBooked: false,
    category: 'Strength'
  },
  {
    id: 'cls-3',
    title: 'Ashtanga Vinyasa Sunrise',
    titleTa: 'அஷ்டாங்க வின்யாச காலை யோகா',
    trainer: 'Coach Deepa Lakshmi',
    branch: 'Anna Nagar',
    day: 'Tomorrow',
    time: '06:30 AM - 07:30 AM',
    capacity: 20,
    bookedCount: 14,
    isBooked: false,
    category: 'Yoga'
  },
  {
    id: 'cls-4',
    title: 'Spinning & Cardio Surge',
    titleTa: 'ஸ்பின்னிங் & கார்டியோ சர்ஜ்',
    trainer: 'Coach Vijay Anand',
    branch: 'Bypass Road',
    day: 'Tomorrow',
    time: '06:00 PM - 07:00 PM',
    capacity: 15,
    bookedCount: 15,
    isBooked: false,
    category: 'Cardio'
  },
  {
    id: 'cls-5',
    title: 'Kettlebell Combat Conditioning',
    titleTa: 'கெட்டில்பெல் காம்பாட் பயிற்சி',
    trainer: 'Coach Meenakshi',
    branch: 'Anna Nagar',
    day: 'Wednesday',
    time: '07:00 PM - 08:00 PM',
    capacity: 14,
    bookedCount: 8,
    isBooked: false,
    category: 'HIIT'
  }
];

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'plan-1',
    name: '1 Month Kickstart',
    nameTa: '1 மாத தொடக்க திட்டம்',
    durationMonths: 1,
    priceInr: 1999,
    features: [
      'Access to any 1 Madurai Branch',
      'Free Fitness & BMI Assessment',
      'Locker room & steam shower access',
      'Mobile app workout tracking'
    ],
    featuresTa: [
      'ஏதேனும் 1 மதுரை கிளையில் பயிற்சி',
      'இலவச உடல் தகுதி மற்றும் BMI பரிசோதனை',
      'லாக்கர் மற்றும் ஸ்டீம் ஷவர் வசதி',
      'செயலி மூலம் பயிற்சி கண்காணிப்பு'
    ]
  },
  {
    id: 'plan-2',
    name: '3 Months Power Up',
    nameTa: '3 மாத பவர் அப் திட்டம்',
    durationMonths: 3,
    priceInr: 4999,
    features: [
      'Access to KK Nagar & Anna Nagar',
      'Custom South Indian Diet Chart',
      '2 Personal Trainer Consultations',
      'Unlimited group studio classes',
      'Guest pass (1 friend per month)'
    ],
    featuresTa: [
      'கே.கே நகர் & அண்ணா நகர் கிளைகள் அணுகல்',
      'தென்னிந்திய உணவு வழிகாட்டி',
      '2 நேரடி பயிற்சியாளர் ஆலோசனைகள்',
      'வரம்பற்ற குழு வகுப்புகள்',
      'மாதம் 1 நண்பருக்கான விருந்தினர் அனுமதி'
    ]
  },
  {
    id: 'plan-3',
    name: '12 Months Annual Elite',
    nameTa: '12 மாத எலைட் ஆண்டு பாஸ்',
    durationMonths: 12,
    priceInr: 14999,
    popular: true,
    badge: 'BEST VALUE',
    features: [
      'All 3 Madurai Branches Access (All-Club)',
      '12 Dedicated 1-on-1 PT Sessions',
      'Quarterly InBody 570 Composition Scans',
      'Personalized Madurai Nutrition Protocol',
      'Official WFIT Madurai Team Dry-Fit Kit',
      'Free Membership Pause up to 45 Days'
    ],
    featuresTa: [
      '3 மதுரை கிளைகளிலும் முழுமையான அனுமதி',
      '12 பிரத்யேக தனிப்பட்ட பயிற்சியாளர் அமர்வுகள்',
      '3 மாதங்களுக்கு ஒருமுறை InBody பரிசோதனை',
      'தனிப்பயனாக்கப்பட்ட தென்னிந்திய உணவு திட்டம்',
      'அதிகாரப்பூர்வ WFIT பிரீமியம் டீ-ஷர்ட் கிட்',
      '45 நாட்கள் வரை திட்டத்தை நிறுத்தி வைக்கும் வசதி'
    ]
  }
];

export const NUTRITION_MEALS: NutritionMeal[] = [
  {
    id: 'meal-1',
    mealType: 'breakfast',
    mealTypeLabel: 'Breakfast (7:30 AM)',
    mealTypeLabelTa: 'காலை உணவு (7:30 AM)',
    name: 'Steamed Idlis + Moong Sprouts + Sambar',
    nameTa: 'ஆவிபறக்கும் இட்லி + முளைகட்டிய பாசிப்பயறு + சாம்பார்',
    description: '4 Soft idlis, tempered spiced sprouted moong dal, drumstick-tomato sambar, and 3 boiled egg whites.',
    descriptionTa: '4 இட்லிகள், முளைகட்டிய பாசிப்பயறு, முருங்கைக்காய் சாம்பார் மற்றும் 3 அவித்த முட்டையின் வெள்ளைக்கரு.',
    calories: 460,
    proteinGrams: 32,
    carbsGrams: 64,
    fatGrams: 6,
    isCompleted: true
  },
  {
    id: 'meal-2',
    mealType: 'lunch',
    mealTypeLabel: 'Lunch (1:00 PM)',
    mealTypeLabelTa: 'மதிய உணவு (1:00 PM)',
    name: 'Madurai Pepper Chicken Breast + Brown Rice',
    nameTa: 'மதுரை மிளகு சிக்கன் + கைக்குத்தல் அரிசி சாதம்',
    description: '200g Freshly crushed black pepper grilled chicken breast, 1.5 cups brown rice, vazhaithandu kootu (banana stem), and rasam.',
    descriptionTa: '200 கிராம் காரசாரமான நாட்டுக்கோழி மார்புக்கறி, கைக்குத்தல் அரிசி சாதம், வாழைத்தண்டு கூட்டு மற்றும் ரசம்.',
    calories: 580,
    proteinGrams: 48,
    carbsGrams: 58,
    fatGrams: 12,
    isCompleted: true
  },
  {
    id: 'meal-3',
    mealType: 'snacks',
    mealTypeLabel: 'Pre-Workout Snack (4:30 PM)',
    mealTypeLabelTa: 'பயிற்சிக்கு முந்தைய சிற்றுண்டி (4:30 PM)',
    name: 'Chilled Ragi Koozh + Buttermilk + Boiled Sundal',
    nameTa: 'ராகி கூழ் + மோர் + கொண்டைக்கடலை சுண்டல்',
    description: 'Fermented finger millet malt blended with spiced shallots, low-fat buttermilk, and black chickpea sundal.',
    descriptionTa: 'சின்ன வெங்காயம் கலந்த ராகி கூழ், சுவையான மோர் மற்றும் சத்தான கருப்பு கொண்டைக்கடலை சுண்டல்.',
    calories: 320,
    proteinGrams: 18,
    carbsGrams: 48,
    fatGrams: 4,
    isCompleted: false
  },
  {
    id: 'meal-4',
    mealType: 'dinner',
    mealTypeLabel: 'Dinner (8:00 PM)',
    mealTypeLabelTa: 'இரவு உணவு (8:00 PM)',
    name: 'Multi-Millet Dosa + Grilled Paneer / Fish Tikka',
    nameTa: 'தினை தோசை + கிரில்டு பன்னீர் / மீன் வறுவல்',
    description: '2 Crisp foxtail millet dosas, mint-coriander chutney, and 150g grilled local fish or paneer steak.',
    descriptionTa: '2 மொறுமொறு தினை தோசை, புதினா சட்னி மற்றும் 150 கிராம் கிரில்டு மீன் அல்லது பன்னீர்.',
    calories: 440,
    proteinGrams: 36,
    carbsGrams: 42,
    fatGrams: 11,
    isCompleted: false
  }
];

export const GYM_TRAINERS: GymTrainer[] = [
  {
    id: 'tr-1',
    name: 'Coach Karthik Raj',
    nameTa: 'கோச் கார்த்திக் ராஜ்',
    role: 'Head Strength & Powerlifting Coach',
    roleTa: 'தலைமை உடற்பயிற்சி & பவர்லிஃப்டிங் பயிற்சியாளர்',
    branch: 'KK Nagar',
    experienceYears: 9,
    specialties: ['Hypertrophy', 'Olympic Weightlifting', 'Injury Prevention'],
    rating: 4.95,
    bio: 'State powerlifting medalist, certified CSCS with 900+ athlete transformation track records in Tamil Nadu.',
    bioTa: 'தமிழ்நாடு மாநில பவர்லிஃப்டிங் வெற்றியாளர், 900-க்கும் மேற்பட்ட உடலமைப்பு மாற்றங்களை உருவாக்கியவர்.',
    image: GYM_IMAGES.coachingFeature,
    availableSlots: ['06:00 AM', '08:30 AM', '05:30 PM', '07:00 PM']
  },
  {
    id: 'tr-2',
    name: 'Coach Meenakshi Sundaram',
    nameTa: 'கோச் மீனாட்சி சுந்தரம்',
    role: 'CrossFit & Calisthenics Master',
    roleTa: 'கிராஸ்ஃபிட் & கேலிஸ்தெனிக்ஸ் பயிற்சியாளர்',
    branch: 'Anna Nagar',
    experienceYears: 7,
    specialties: ['HIIT', 'Metabolic Conditioning', 'Bodyweight Gymnastics'],
    rating: 4.92,
    bio: 'Former Indian athletic camp coach, specializing in high-torque agility, kettlebell drills, and VO2 max expansion.',
    bioTa: 'இந்திய தடகள முகாம் பயிற்சியாளர், அதிக ஆற்றல் மற்றும் சுறுசுறுப்பான உடற்பயிற்சிகளில் நிபுணர்.',
    image: GYM_IMAGES.strengthFeature,
    availableSlots: ['07:00 AM', '09:00 AM', '06:00 PM', '08:00 PM']
  },
  {
    id: 'tr-3',
    name: 'Coach Deepa Lakshmi',
    nameTa: 'கோச் தீபா லட்சுமி',
    role: 'Yoga Therapist & Women Fitness Specialist',
    roleTa: 'யோகா சிகிச்சை & பெண்கள் தகுதி நிபுணர்',
    branch: 'Anna Nagar',
    experienceYears: 6,
    specialties: ['Hatha & Vinyasa Yoga', 'PCOS Management', 'Core Rehabilitation'],
    rating: 4.98,
    bio: 'Certified Yoga Acharya with deep roots in biomechanical alignment, women’s hormonal fitness, and postural correction.',
    bioTa: 'யோகா ஆச்சார்யா சான்றிதழ் பெற்றவர், பெண்களுக்கான சிறப்பு உடற்பயிற்சி மற்றும் யோகா பயிற்றுவிப்பாளர்.',
    image: GYM_IMAGES.cardioFeature,
    availableSlots: ['06:30 AM', '10:00 AM', '04:30 PM', '06:30 PM']
  },
  {
    id: 'tr-4',
    name: 'Coach Vijay Anand',
    nameTa: 'கோச் விஜய் ஆனந்த்',
    role: 'Cardio Endurance & Functional Rehab',
    roleTa: 'கார்டியோ & உடல் மறுவாழ்வு நிபுணர்',
    branch: 'Bypass Road',
    experienceYears: 8,
    specialties: ['Marathon Training', 'Knee & Spine Rehab', 'Fat Loss Programming'],
    rating: 4.88,
    bio: 'Madurai Marathon lead pacer, specialist in cardiac rehabilitation and pain-free biomechanics.',
    bioTa: 'மதுரை மாரத்தான் முதன்மை ஓட்டப்பந்தய வீரர், இதய ஆரோக்கியம் மற்றும் மூட்டு வலி மறுவாழ்வு பயிற்சியாளர்.',
    image: GYM_IMAGES.dumbbellsTraining,
    availableSlots: ['06:00 AM', '07:30 AM', '05:00 PM', '06:30 PM']
  }
];

export const PROGRESS_HISTORY: ProgressMetric[] = [
  { date: 'Oct 01', weight: 78.5, fatPercentage: 22.4, muscleMassKg: 32.8 },
  { date: 'Oct 08', weight: 77.6, fatPercentage: 21.8, muscleMassKg: 33.1 },
  { date: 'Oct 15', weight: 76.9, fatPercentage: 21.2, muscleMassKg: 33.4 },
  { date: 'Oct 22', weight: 75.8, fatPercentage: 20.5, muscleMassKg: 33.8 },
  { date: 'Oct 29', weight: 74.9, fatPercentage: 19.8, muscleMassKg: 34.2 },
  { date: 'Nov 05', weight: 74.2, fatPercentage: 19.1, muscleMassKg: 34.6 }
];

export const CHECKIN_HISTORY: CheckInLog[] = [
  { id: 'chk-1', date: 'Today, Nov 02', time: '06:24 AM', branch: 'KK Nagar', type: 'Morning Lift' },
  { id: 'chk-2', date: 'Yesterday, Nov 01', time: '06:30 AM', branch: 'KK Nagar', type: 'HIIT Session' },
  { id: 'chk-3', date: 'Oct 31, 2026', time: '05:45 PM', branch: 'Anna Nagar', type: 'Evening Cardio' },
  { id: 'chk-4', date: 'Oct 30, 2026', time: '06:15 AM', branch: 'KK Nagar', type: 'Morning Lift' },
  { id: 'chk-5', date: 'Oct 29, 2026', time: '07:05 AM', branch: 'Bypass Road', type: 'Open Gym' },
  { id: 'chk-6', date: 'Oct 28, 2026', time: '06:20 AM', branch: 'KK Nagar', type: 'Morning Lift' }
];

// Bilingual translations dictionary
export const I18N = {
  en: {
    brandSubtitle: 'MADURAI',
    tagline: 'PREMIUM FITNESS CENTER',
    // Nav tabs
    tabDashboard: 'Home',
    tabWorkouts: 'Workouts',
    tabClasses: 'Classes',
    tabDiet: 'Diet',
    tabTrainers: 'Trainers',
    tabProfile: 'Profile',
    // Dashboard
    greeting: 'Vanakkam',
    streak: 'Day Streak',
    streakFire: '14-Day Streak',
    streakDesc: '2 more days to beat your all-time Madurai club record!',
    membershipActive: 'ACTIVE PASS',
    membershipRenews: 'Expires in 18 days',
    quickQrCheckIn: 'QR Check-in',
    quickBookClass: 'Book Class',
    quickLogWater: 'Log Water',
    quickPayment: 'Renew Plan',
    todayWorkoutHeader: "Today's Prescribed Routine",
    viewAllWorkouts: 'View All Plans',
    startWorkout: 'Start Workout',
    burnMetric: 'Calories Burned',
    waterMetric: 'Water Intake',
    workoutMetric: 'Daily Exercise',
    branchesTitle: 'Our Madurai Centers',
    // Workout Plans
    workoutsHeader: 'Workout Programs',
    allCategories: 'All Focus',
    exercisesLabel: 'exercises',
    minsLabel: 'mins',
    caloriesEst: 'est. cals',
    completedCount: 'completed',
    timerRunning: 'Rest Timer',
    markExerciseComplete: 'Done',
    workoutCompletedToast: 'Workout completed! Great dedication.',
    // Classes
    classesHeader: 'Weekly Class Schedule',
    bookNow: 'Book Seat',
    cancelBooking: 'Cancel',
    bookedSuccess: 'Booked',
    slotsLeft: 'slots left',
    classFull: 'Full',
    // Membership
    membershipHeader: 'Membership & Plans',
    currentPlanBadge: 'CURRENT PLAN',
    renewViaUpi: 'Renew / Upgrade via UPI',
    payWithGpay: 'Pay with Google Pay',
    payWithPhonePe: 'Pay with PhonePe',
    payWithPaytm: 'Pay with Paytm',
    scanQrUpi: 'Scan any UPI QR',
    verifyUpiId: 'Enter UPI VPA ID',
    payNow: 'Proceed to Pay ₹',
    // Progress
    progressHeader: 'Transformation Tracker',
    currentWeight: 'Current Weight',
    targetWeight: 'Goal Weight',
    bodyFat: 'Body Fat',
    muscleMass: 'Muscle Mass',
    bmiLabel: 'BMI Status',
    weightTrend: 'Weight Progress (kg)',
    // Diet
    dietHeader: 'South Indian Nutrition',
    macroBreakdown: "Today's Macro Targets",
    protein: 'Protein',
    carbs: 'Carbs',
    fats: 'Fats',
    markMealEaten: 'Mark Eaten',
    mealDone: 'Eaten',
    addWater: '+250 ml Water',
    // Trainers
    trainersHeader: 'Expert Madurai Coaches',
    bookPtSession: 'Book 1-on-1 Session',
    selectSlot: 'Select Time Slot',
    confirmBooking: 'Confirm Appointment',
    // Profile
    profileHeader: 'Member Profile',
    editProfile: 'Edit Profile',
    notifications: 'Session Reminders & SMS',
    languageToggle: 'Language (தமிழ் / English)',
    switchBranch: 'Home Branch',
    logout: 'Log Out',
    qrTitle: 'WFIT Fast Club Entry Pass',
    scanAtGate: 'Scan at KK Nagar, Anna Nagar, or Bypass Road turnstile gates',
    passValid: 'Valid Today'
  },
  ta: {
    brandSubtitle: 'மதுரை',
    tagline: 'பிரீமியம் உடற்பயிற்சி மையம்',
    // Nav tabs
    tabDashboard: 'முகப்பு',
    tabWorkouts: 'பயிற்சிகள்',
    tabClasses: 'வகுப்புகள்',
    tabDiet: 'உணவு முறை',
    tabTrainers: 'பயிற்றுநர்கள்',
    tabProfile: 'சுயவிவரம்',
    // Dashboard
    greeting: 'வணக்கம்',
    streak: 'தொடர் நாட்கள்',
    streakFire: '14 நாட்கள் தொடர்ச்சி',
    streakDesc: 'உங்கள் முந்தைய சாதனையை முறியடிக்க இன்னும் 2 நாட்கள் மட்டுமே!',
    membershipActive: 'செயலில் உள்ள பாஸ்',
    membershipRenews: '18 நாட்களில் புதுப்பிக்க வேண்டும்',
    quickQrCheckIn: 'QR நுழைவு',
    quickBookClass: 'வகுப்பு பதிவு',
    quickLogWater: 'தண்ணீர் பதிவு',
    quickPayment: 'திட்டம் புதுப்பிப்பு',
    todayWorkoutHeader: 'இன்றைய உடற்பயிற்சி திட்டம்',
    viewAllWorkouts: 'அனைத்து பயிற்சிகள்',
    startWorkout: 'பயிற்சியைத் தொடங்கு',
    burnMetric: 'எரிந்த கலோரிகள்',
    waterMetric: 'தண்ணீர் அளவு',
    workoutMetric: 'பயிற்சி நேரம்',
    branchesTitle: 'நமது மதுரை கிளைகள்',
    // Workout Plans
    workoutsHeader: 'உடற்பயிற்சி திட்டங்கள்',
    allCategories: 'அனைத்து பிரிவுகள்',
    exercisesLabel: 'பயிற்சிகள்',
    minsLabel: 'நிமிடங்கள்',
    caloriesEst: 'கலோரிகள்',
    completedCount: 'முடிக்கப்பட்டது',
    timerRunning: 'ஓய்வு நேரம்',
    markExerciseComplete: 'முடிந்தது',
    workoutCompletedToast: 'பயிற்சி வெற்றிகரமாக முடிந்தது! வாழ்த்துகள்.',
    // Classes
    classesHeader: 'வாராந்திர வகுப்பு அட்டவணை',
    bookNow: 'இடம் பதிவு செய்',
    cancelBooking: 'ரத்து செய்',
    bookedSuccess: 'பதிவு செய்யப்பட்டது',
    slotsLeft: 'இடங்கள் மீதம்',
    classFull: 'நிரம்பியது',
    // Membership
    membershipHeader: 'உறுப்பினர் கட்டணங்கள் & சலுகைகள்',
    currentPlanBadge: 'தற்போதைய திட்டம்',
    renewViaUpi: 'UPI மூலம் புதுப்பிக்கவும்',
    payWithGpay: 'Google Pay மூலம் செலுத்துக',
    payWithPhonePe: 'PhonePe மூலம் செலுத்துக',
    payWithPaytm: 'Paytm மூலம் செலுத்துக',
    scanQrUpi: 'UPI QR ஸ்கேன் செய்க',
    verifyUpiId: 'UPI VPA ஐடி உள்ளிடவும்',
    payNow: 'கட்டணம் செலுத்துக ₹',
    // Progress
    progressHeader: 'உடல் முன்னேற்ற கண்காணிப்பு',
    currentWeight: 'தற்போதைய எடை',
    targetWeight: 'இலக்கு எடை',
    bodyFat: 'கொழுப்பு சதவீதம்',
    muscleMass: 'தசை எடை',
    bmiLabel: 'BMI நிலை',
    weightTrend: 'எடை மாற்றம் (கிலோ)',
    // Diet
    dietHeader: 'தென்னிந்திய சத்துணவு திட்டம்',
    macroBreakdown: 'இன்றைய மேக்ரோ இலக்குகள்',
    protein: 'புரதம்',
    carbs: 'கார்போஹைட்ரேட்',
    fats: 'கொழுப்பு',
    markMealEaten: 'சாப்பிட்டேன்',
    mealDone: 'முடிந்தது',
    addWater: '+250 மிலி தண்ணீர்',
    // Trainers
    trainersHeader: 'மதுரையின் தலைசிறந்த பயிற்சியாளர்கள்',
    bookPtSession: 'தனிப்பட்ட அமர்வு பதிவு செய்',
    selectSlot: 'நேரத்தை தேர்ந்தெடுக்கவும்',
    confirmBooking: 'பதிவை உறுதி செய்',
    // Profile
    profileHeader: 'உறுப்பினர் சுயவிவரம்',
    editProfile: 'விவரங்களை மாற்று',
    notifications: 'நினைவூட்டல்கள் & குறுஞ்செய்தி',
    languageToggle: 'மொழி (English / தமிழ்)',
    switchBranch: 'முதன்மை கிளை',
    logout: 'வெளியேறு',
    qrTitle: 'WFIT கிளப் நுழைவு பாஸ்',
    scanAtGate: 'கே.கே நகர், அண்ணா நகர் அல்லது பைபாஸ் ரோடு நுழைவு வாயிலில் ஸ்கேன் செய்க',
    passValid: 'இன்று செல்லுபடியாகும்'
  }
};
