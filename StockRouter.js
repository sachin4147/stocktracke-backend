const express =require("express")
const Stock=require("../models/Stockmoddel")
const StockRouter=express.Router()


StockRouter.post("/post",async(req,res)=>{
    try {
        

        let data= new Stock(req.body)

        await data.save()
        return res.send({msg:"user added stock price"})
        
    } catch (error) {
        return res.send({error:"someting went wrong"})
    }
})

// Mock API Endpoint
StockRouter.get('/stocks', async (req, res) => {
  try {
    const stocks = await Stock.find();
    const randomStock = stocks[Math.floor(Math.random() * stocks.length)];

    return res.send({
        success:true,
        message:"user fetched successfully",
        data:stocks,
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update stock prices every minute
setInterval(async () => {
  await Stock.updateStockPrices();
}, 60000); // 60000 milliseconds = 1 minute

module.exports=StockRouter