import { populate } from "./src/database/tables/seed.js";
import { CreateTable } from "./src/database/tables/tables.js";

class Config{
    constructor(){}

    pre_fligth_check(){
        CreateTable();
        populate();        
    }

}

export default Config;