var express = require('express')
var app = express()
app.use(express.json())

var rooms = []

app.post('/createroom',(req,res)=>{
    rooms.push(req.body)
    res.status(200).json({
        message: 'room created'
    })

    
})

app.get('/showroom',(req,res)=>{

    res.status(200).json(rooms)

    
})

app.post('/bookroom',(req,res)=>{
   

    rooms.map((item)=>{
        if(req.body.room_id == item.room_id)
        {  item.status = 'booked'
          item.booking_date = req.body.booking_date
          item.start_time = req.body.start_time
          item.end_time = req.body.end_time  
          item.customer_name = req.body.customer_name
        }
    })

    res.status(200).json({
        message: 'room booked'
    })

    
})

app.get('/bookings',(req,res)=>{
 
    res.status(200).json(

            rooms.reduce((item)=>{
                if(item.status == 'booked')
          return(   {
                    "room_id" : item.room_id ,
                    "status" :  item.status,
                    "customer_name" : item.customer_name,
                    "booking_date" : item.booking_date,
                    "start_time" : item.start_time,
                    "end_time" : item.end_time
                
                })
            
            })
        )

    
})

app.get('/customers',(req,res)=>{
 

    res.status(200).json(

            rooms.reduce((item)=>{
                if(item.customer_name)
          return(   {
    
                    "customer_name" : item.customer_name,
                    "room_id" : item.room_id ,
                    "booking_date" : item.booking_date,
                    "start_time" : item.start_time,
                    "end_time" : item.end_time
                
                })
     
                
            })
            
        )

    
})



app.listen(3000)

