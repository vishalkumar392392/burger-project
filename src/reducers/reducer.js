const initialState ={
  ingredients:[],
  price:4
}

const reducer = (state=initialState,action) =>{
   
  console.log(action)
  switch(action.type){
    case('INGREDIENTS'):
         return{
            ...state,
            ingredients:action.ingre
         }
    case('PRICE'):
         const newState = [...state]
         return{
            ...newState,
            ingredients:action.ingre,
            price:action.price

         }
    default:
         return{
           ...state
         }

  }

}

export default reducer;