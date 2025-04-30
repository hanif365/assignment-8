export const ServiceStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  DONE: 'done'
} as const;

export type TServiceStatus = typeof ServiceStatus[keyof typeof ServiceStatus]; 