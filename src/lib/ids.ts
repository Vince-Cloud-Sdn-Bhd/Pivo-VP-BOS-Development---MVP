let sequence=100
export function nextId(prefix:string){sequence+=1;return `${prefix}-${String(sequence).padStart(4,'0')}`}
export function requestKey(){return crypto.randomUUID()}
