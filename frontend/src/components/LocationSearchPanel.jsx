import React from "react";

const LocationSearchPanel = (props) => {
  // console.log(props);
  // sample array of location
  const locations = [
    "Rahul Sharma, 123 MG Road, Bengaluru, Karnataka, 560001, India",
    "Thomas Mueller, Hostatostrasse 16, Frankfurt, Hesse, 65929, Germany",
    "Sarah Wilson, 162-168 Regent Street, London, Greater London, W1B 5TG, UK",
    "Cecilia Chapman, 711-2880 Nulla St., Mankato, Mississippi, 96522, USA",
  ];

  return (
    <div>
      {/* this is a sample data */}
      {locations.map(function (elem) {
        return (
          <div 
            onClick={()=> {props.setVehiclePanel(true),
              props.setpanaelOpen(false)
        
             } }
            key={elem}
            className="flex gap-3 rounded-xl border-gray-50 active:border-black border-2 p-3 my-2 items-center justify-start"
          >
            <h2 className="bg-[#eee] rounded-full h-6 w-9 mr-3 justify-center flex item-center">
              <i className="ri-map-pin-line text-xl"></i>
            </h2>
            <h4 className="font-medium">{elem}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
