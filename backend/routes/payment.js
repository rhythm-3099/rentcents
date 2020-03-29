const checksum_lib = require('../Paytm/checksum/checksum')
const port = 3000
const express = require("express");
const router = express.Router();

router.get('/',(req,res)=>{
    let params ={}
    params['MID'] = 'MroZjN53836789161794',
    params['WEBSITE'] = 'WEBSTAGING',
    params['CHANNEL_ID'] = 'WEB',
    params['INDUSTRY_TYPE_ID'] = 'Retail',
    params['ORDER_ID'] = 'ORD0006',
    params['CUST_ID'] = 'CUST0011',
    params['TXN_AMOUNT'] = '100',
    params['CALLBACK_URL'] = 'http://localhost:'+ 4200 + "/",
    params['EMAIL'] = 'xyz@gmail.com',
    params['MOBILE_NO'] = '9913605473'

    checksum_lib.genchecksum(params,'!z#fUDRWzn@Hc0zN',function(err,checksum){
        let txn_url = "https://securegw-stage.paytm.in/order/process"

        let form_fields = ""
        for(x in params)
        {
            form_fields += "<input type='hidden' name='"+x+"' value='"+params[x]+"'/>"

        }

        form_fields+="<input type='hidden' name='CHECKSUMHASH' value='"+checksum+"' />"

        var html = '<html><body><center><h1>Please wait! Do not refresh the page</h1></center><form method="post" action="'+txn_url+'" name="f1">'+form_fields +'</form><script type="text/javascript">document.f1.submit()</script></body></html>'
        res.writeHead(200,{'Content-Type' : 'text/html'})
        res.write(html)
        res.end()
    })
});


module.exports = router;
