/*
 * Flexible Types
 */
type MyFlexibleDogInfo = {
  name: string;
  [key: string]: string | number;
}

const dog: MyFlexibleDogInfo = {
  name: "LG",
  breed: "Mutt",
  age: 22
}

interface DogInfo {
  name: string;
  age: number;
}
/**
 * It's like transform Type, or we can say: mapped type
 */
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};
type DoginfoOptions = OptionsFlags<DogInfo>
