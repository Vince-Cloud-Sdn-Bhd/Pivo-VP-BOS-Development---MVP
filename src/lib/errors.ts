export type DomainErrorCode='FORBIDDEN'|'NOT_FOUND'|'CONFLICT'|'VALIDATION'|'STALE_VERSION'|'IDEMPOTENCY_CONFLICT'
export class DomainError extends Error{
  constructor(public code:DomainErrorCode,message:string){super(message);this.name='DomainError'}
}
