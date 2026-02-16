// features/panel/lab/constants/testCategories.ts

export interface TestCategory {
  id: string
  name: string
  description?: string
  subCategories: string[]
  icon?: string
}

export const testCategories: TestCategory[] = [
  {
    id: 'blood',
    name: 'Blood Tests',
    description: 'Complete blood count, glucose, etc.',
    subCategories: ['CBC', 'Lipid Profile', 'Liver Function', 'Kidney Function', 'Thyroid'],
    icon: 'Droplet'
  },
  {
    id: 'urine',
    name: 'Urine Tests',
    description: 'Urinalysis, culture, etc.',
    subCategories: ['Routine', 'Microalbumin', 'Culture'],
    icon: 'Beaker'
  },
  {
    id: 'imaging',
    name: 'Imaging',
    description: 'X-Ray, Ultrasound, MRI, CT Scan',
    subCategories: ['X-Ray', 'Ultrasound', 'MRI', 'CT Scan'],
    icon: 'Scan'
  },
  {
    id: 'cardiac',
    name: 'Cardiac Tests',
    description: 'ECG, ECHO, TMT',
    subCategories: ['ECG', 'ECHO', 'TMT', 'Holter'],
    icon: 'Heart'
  },
  {
    id: 'hormones',
    name: 'Hormone Tests',
    description: 'Thyroid, reproductive hormones',
    subCategories: ['TSH', 'T3', 'T4', 'FSH', 'LH', 'Prolactin'],
    icon: 'Activity'
  },
  {
    id: 'infectious',
    name: 'Infectious Diseases',
    description: 'Dengue, Malaria, Typhoid, COVID',
    subCategories: ['Dengue', 'Malaria', 'Typhoid', 'COVID-19'],
    icon: 'Virus'
  }
]

export const sampleTypes: string[] = [
  'Blood',
  'Urine',
  'Stool',
  'Sputum',
  'Swab',
  'Tissue',
  'CSF',
  'Other'
]

export const containerTypes: string[] = [
  'Vacutainer (Red)',
  'Vacutainer (Lavender)',
  'Vacutainer (Blue)',
  'Sterile Container',
  'Swab Tube',
  'Other'
]

export const methods: string[] = [
  'HPLC',
  'ELISA',
  'PCR',
  'Culture',
  'Microscopy',
  'Chemical',
  'Immunoassay',
  'Other'
]