
function PlaceImg(place, index=0, className=null) {
  console.log(place)
  if (!place.photos?.length){
  return null;
}
if (!className){
  className = ' object-cover'
}
  return (
    <img className= {className} src={"http://localhost:4000/uploads/" + place.photos[index]} alt="" />
  );
}

export default PlaceImg

// import React from 'react'

// function PlaceImg({place, index=0, className=null}) {
//     if (!place.photos?.length) {
//         return '';
//       }
//       if (!className) {
//         className = 'object-cover';
//       }
//   return (
//     <img className={className} src={place.photos[index]} alt=""/>
//   )
// }

// export default PlaceImg

// import React from 'react'

// function PlaceImg({place, index=0, className=null}) {
//     if (!place.photos?.length) {
//         return '';
//       }
//       if (!className) {
//         className = 'object-cover';
//       }
//   return (
//     <img className={className} src={place.photos[index]} alt=""/>
//   )
// }

// export default PlaceImg