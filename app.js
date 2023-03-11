const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// app.get('/' , (req , res) => {
//     res.status(200).json({message: 'hello from the server side!' , name: "kanhaiya" , age: 21});
// });

// app.post('/' , (req , res) => {
//     res.status(200).json({
//         name: "kanhaiya",
//         age: 21
//     })
// })


const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/tours-simple.json`));

// I use JSON.parse befor reading because this data in json format and i wanna data in Java script object foermat so i use json.parse


app.get('/api/v1/tours' , (req , res) => {
    res.status(200).json({
        status: 'success',
        dataLength: tours.length,
        data: {
            tours: tours
        }
    })
})

app.post('/api/v1/tours' , (req , res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/tours-simple.json` , JSON.stringify(tours) , err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
})



app.get('/api/v1/tours/:id' , (req, res) => {
    let id = req.params.id * 1;
    const tour = tours.find((data) => data.id == id);
    if(!tour) {
       return res.status(404).json({
            status: 'fail',
            message: "Write Correct Id"
        })
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour: tour
        }
    })
})

//Get Data By Params


app.patch('/api/v1/tours/:id' , (req , res) => {



    if(req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Write Correct Id'
        })
    }
   res.status(200).json({
    status: 'success',
    data: {
        tour: '<Updated tour here...>'
    }
   }) 
})

app.listen(port , () => {
    console.log(`App runing on port ${port}...`);
});
