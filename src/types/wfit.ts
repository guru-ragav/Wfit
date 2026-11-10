export type Language = 'en' | 'ta';

export type MaduraiBranch = 'KK Nagar' | 'Anna Nagar' | 'Bypass Road';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  branch: MaduraiBranch;
  membershipPlan: string;
  membershipExpiry: string; // e.g., '2026-12-31'
  streakDays: number;
  totalWorkouts: number;
  weightKg: number;
  heightCm: number;
  targetWeightKg: number;
  waterIntakeMl: number;
  waterGoalMl: number;
  caloriesBurned: number;
  caloriesGoal: number;
  activeWorkoutMinutes: number;
  workoutGoalMinutes: number;
}

export type WorkoutCategory = 'Strength' | 'Cardio' | 'HIIT' | 'Yoga' | 'Weight Loss';

export interface ExerciseItem {
  id: string;
  name: string;
  nameTa: string;
  sets: number;
  reps: string;
  restSec: number;
  notes: string;
  completed?: boolean;
}

export interface WorkoutRoutine {
  id: string;
  title: string;
  titleTa: string;
  category: WorkoutCategory;
  durationMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  difficultyTa: string;
  caloriesEstimate: number;
  description: string;
  descriptionTa: string;
  exercises: ExerciseItem[];
}

export interface ClassSession {
  id: string;
  title: string;
  titleTa: string;
  trainer: string;
  branch: MaduraiBranch;
  day: string; // 'Today', 'Tomorrow', 'Wed, Nov 5'
  time: string; // '06:30 AM - 07:30 AM'
  capacity: number;
  bookedCount: number;
  isBooked: boolean;
  category: WorkoutCategory;
}

export interface MembershipPlan {
  id: string;
  name: string;
  nameTa: string;
  durationMonths: number;
  priceInr: number;
  features: string[];
  featuresTa: string[];
  popular?: boolean;
  badge?: string;
}

export interface NutritionMeal {
  id: string;
  mealType: 'breakfast' | 'lunch' | 'snacks' | 'dinner';
  mealTypeLabel: string;
  mealTypeLabelTa: string;
  name: string;
  nameTa: string;
  description: string;
  descriptionTa: string;
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  isCompleted?: boolean;
}

export interface GymTrainer {
  id: string;
  name: string;
  nameTa: string;
  role: string;
  roleTa: string;
  branch: MaduraiBranch;
  experienceYears: number;
  specialties: string[];
  bio: string;
  bioTa: string;
  rating: number;
  image: string;
  availableSlots: string[];
}

export interface ProgressMetric {
  date: string;
  weight: number;
  fatPercentage: number;
  muscleMassKg: number;
}

export interface CheckInLog {
  id: string;
  date: string;
  time: string;
  branch: MaduraiBranch;
  type: 'Morning Lift' | 'Evening Cardio' | 'HIIT Session' | 'Open Gym';
}
