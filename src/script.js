const people = {
  name: '',
  hello() {
    console.log('hello', this.name);
  },
  hey: () => {
    console.log('hey', this.name);
  },
};
people.hello();
people.hey();
