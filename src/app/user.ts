export class User {
  constructor(
    public username:string = '',
    public password:string = '',
    public passwordConfirm:string = '',
    public payPassword:string = '',
    public payPasswordConfirm:string = ''
  ){}
}