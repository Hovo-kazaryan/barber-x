export interface AuthStrategy {
  validate(payload: any): Promise<any>;
}
