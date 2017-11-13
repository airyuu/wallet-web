export class Txrefs { 
    public block_height:number = 0;
    public confirmations:number = 0;
    public confirmed:string = '';
    public double_spend:boolean = false;
    public ref_balance:number = 0;
    public tx_hash:string = '';
    public tx_input_n:number = 0;
    public tx_output_n:number = 0;
    public value:number = 0 
}

export class IconData { 
    public accountID:string = '';
    public btc_address:string = '';
    public btc_balance:number = 0;
    public btc_cny:string = '0';
    public btc_txrefs:Txrefs[] = [];
    public eth_address:string = '';
    public eth_balance:number = 0;
    public eth_cny:string = '0';
    public eth_txrefs:Txrefs[] = [];
    public token:string = '';
    public username:string = '';
    public payPasswordStatus:boolean = false;
}