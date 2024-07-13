function Card() {
  return (
    <div className="w-96 h-56 m-auto bg-gradient-to-r from-purple-800 to-purple-500 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-105">
      <img
        className="relative object-cover w-full h-full rounded-xl opacity-20"
        src="https://i.imgur.com/kGkSg1v.png"
      />

      <div className="w-full px-8 absolute top-8">
        <div className="flex justify-between">
          <div className="">
            <p className="font-light text-sm">CARD HOLDER</p>
            <p className="font-medium tracking-widest">Derrick Fisher</p>
          </div>
          <img
            className="w-12 h-12"
            src="https://i.imgur.com/bbPHJVe.png"
            alt="Card Logo"
          />
        </div>
        <div className="pt-4">
          <p className="font-light text-sm">Card Number</p>
          <p className="font-medium tracking-more-wider text-lg">
            2984 5633 7859 4141
          </p>
        </div>
        <div className="pt-6 pr-6">
          <div className="flex justify-between">
            <div className="">
              <p className="font-light text-xs">Valid</p>
              <p className="font-medium tracking-wider text-sm">12/24</p>
            </div>
            <div className="">
              <p className="font-light text-xs">Expiry</p>
              <p className="font-medium tracking-wider text-sm">12/27</p>
            </div>
            <div className="">
              <p className="font-light text-xs">CVV</p>
              <p className="font-bold tracking-more-wider text-sm">···</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
