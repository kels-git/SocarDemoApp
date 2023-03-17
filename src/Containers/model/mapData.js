
const Images = [
  
    { image: require('../../Assets/Image/newCar.png') },

    { image: require("../../Assets/Image/benz.png") },
    { image: require("../../Assets/Image/honda.png") },
    { image: require("../../Assets/Image/suzuki.png") },

];

export const locateCar =[
    {
        id:'0',
        place:'Putrajaya',
        cordinate:{
            longitude: 2.955484468522828, 
            latitude: 101.72002591485048
        }
    },

    {
        id:'1',
        place:'Serdang',
        cordinate:{
            longitude: 2.9776848253710977, 
            latitude: 101.71564855003601
            ,
            
        }
    },
    {
        id:'2',
        place:'Cyberjaya',
        cordinate:{
            longitude: 2.941081430231489 ,
            latitude:  101.65607708136125

            , 
        }
    },

    {
        id:'3',
        place:'Puchong',
        cordinate:{
            longitude: 3.0328200354704316,
            latitude:  101.61759651510557

        }
    },

    {
        id:'4',
        place:'Seri Kembangan',
        cordinate:{
            longitude: 3.0225253087437585,
            latitude:  101.70527504149311

        }
        
    },

    
    {
        id:'5',
        place:'Petaling Jaya',
        cordinate:{
            longitude: 3.127710336000895,
            latitude:  101.5944265203092

        }
     
    },

    {
        id:'6',
        place:'Kuala Lumpur',
        cordinate:{
            longitude: 3.1394308889853826,
            latitude: 101.68914790821344

        }
    },

    {
        id:'7',
        place:'Bukit Jalil',
        cordinate:{
            longitude:   3.0592189365183593,
            latitude: 101.69323072878878
        }
        
    },
    {
        id:'8',
        place:'Subang Jaya',
        cordinate:{
            longitude:    3.0571804344710927,
            latitude: 101.58626088309612
        }
      
    }
]



export const markers = [
    {
        id: '0',
        coordinate: {
            longitude: 101.693207,
            latitude: 3.140853
        },
        carName: "Toyota Altis",
        image: Images[0].image,
        location: "Kuala Lumpur",
        fuelPump: "92%",
        distance: "11.5km",
        price: 16.50,
        time: "For 1 hour, 0 minute",
        isSelected: "Rent a car",

    },
    {
        id: '1',
        coordinate: {

            longitude: 101.617767,
            latitude: 3.025340
        },
        carName: "Benz CVV",
        image: Images[1].image,
        location: "Puchong, Selangor",
        fuelPump: "92%",
        distance: "11.5km",
        price: 108.20,
        time: "For 1 hour, 0 minute",
        isSelected: "Rent a car",

    },

    {
        id: '2',
        coordinate: {
            latitude: 2.921318,
            longitude: 101.655935
        },
        carName: "Suzuki",
        image: Images[2].image,
        location: "Cyberjaya",
        fuelPump: "92%",
        distance: "11.5km",
        price: 7.52,
        time: "For 1 hour, 0 minute",
        isSelected: "Rent a car",

    },

    {

        id: '3',
        coordinate: {
            latitude: 3.127887,
            longitude: 101.594490
        },
        carName: "Honda",
        image: Images[3].image,
        location: "Petaling Jaya",
        fuelPump: "92%",
        distance: "11.5km",
        price: 19,
        time: "For 1 hour, 0 minute",
        isSelected: "Rent a car",
    },
    {

        id: '4',
        coordinate: {
            latitude: 3.058675,
            longitude: 101.691707
        },
        carName: "Honda CRV",
        image: Images[3].image,
        location: "Bukit Jalil",
        fuelPump: "92%",
        distance: "11.5km",
        price: 19,
        time: "For 1 hour, 0 minute",
        isSelected: "Rent a car",

    },
    {
        id: '5',
        coordinate: {
            latitude: 3.081213,
            longitude: 101.5844108
        },
        carName: "Benz CVV",
        image: Images[1].image,
        location: "Subang Jaya",
        fuelPump: "92%",
        distance: "11.5km",
        price: 105.5,
        time: "For 1 hour, 0 minute",
        isSelected: "Rent a car",

    },
    {

        id: '6',
        coordinate: {
            longitude: 3.021998,
            latitude: 101.705541
        },
        carName: "Toyota Altis",
        image: Images[0].image,
        location: "Seri Kembangan",
        fuelPump: "92%",
        distance: "11.5km",
        price: 16.50,
        time: "For 1 hour, 0 minute",
        isSelected: "Rent a car",

    },

]
