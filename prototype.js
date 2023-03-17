const itemDeal = {
    colorOfHeader: blue,

    create() {
      console.log("our item create");
    },
    delete() {
      console.log("our item delete now");
    },
  };
  const newDeal = Object.create(itemDeal, { owner: { value: 'Paul' } });
  console.log(newDeal.__proto__ === itemDeal); 