const obj = {
  name: 'asd',
  prop: {
    // name: 'Rox',
    getName: function () {
      console.log('getName', this.name);
    },
    arrow: () => {
      console.log('arrow', this.name);
    },
  },
};

obj.prop.getName(); // Rox
obj.prop.arrow(); // undefined
