// features/panel/lab/constants/index.ts

export * from './sidebarItems'
export * from './onboardingSteps'
// ⚠️ Don't use wildcard export if it causes conflicts
// export * from './testCategories'

// ✅ Instead, export named exports explicitly
export { 
  testCategories, 
  sampleTypes, 
  containerTypes, 
  methods,
  type TestCategory 
} from './testCategories'

export * from './bookingStatus'
export * from './reportStatus'
export * from './accreditationTypes'