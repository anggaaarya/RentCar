export default {
  name: 'cars',
  type: 'document',
  title: 'Cars',
  fields: [
    {
      name: 'carName',
      type: 'string',
      title: 'Car Name',
    },
    {
      name: 'price',
      type: 'string',
      title: 'Price',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
    },
    {
      name: 'model',
      type: 'string',
      title: 'Model',
    },
    {
      name: 'automatic',
      type: 'string',
      title: 'Automatic',
    },
    {
      name: 'brand',
      type: 'string',
      title: 'Brand',
    },
    {
      name: 'speed',
      type: 'string',
      title: 'Speed',
    },
    {
      name: 'isHaveGps',
      type: 'boolean',
      title: 'Have GPS?',
    },
    {
      name: 'isBooking',
      type: 'boolean',
      title: 'is Cars Booking?',
    },
    {
      name: 'isHaveHeatedSeat',
      type: 'boolean',
      title: 'Have Heated Seat?',
    },
    {
      name: 'isHotOffer',
      type: 'boolean',
      title: 'is Hot Offering?',
    },
    {
      title: 'Car Image',
      name: 'carImage',
      type: 'image',
      options: {
        hotspot: true, // <-- Defaults to false
      },
    },
  ],
}
