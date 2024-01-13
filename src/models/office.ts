import OfficeType from '../types/office';

export default class Office {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;

  constructor(data: OfficeType) {
    this.id = data.id;
    this.name = data.name;
    this.address = data.address;
    this.city = data.city;
    this.state = data.state;
    this.zip = data.zip;
  }
}
