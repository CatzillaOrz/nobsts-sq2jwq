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

/**
 * Usage in Listeners function
 * @Capitalize<Property> Utility
 */

type Listeners<Type> = {
  [Property in keyof Type as  `on${Capitalize<string & Property>}Change`]?:
  (newVal: Type[Property]) => void;
} & {
    [Property in keyof Type as  `on${Capitalize<string & Property>}Delete`]?:
    (newVal: Type[Property]) => void;
  }

function listenToObject<T>(obj: T, listeners: Listeners<T>): void {
  throw "Needs to be implemented";
}

const lg: DogInfo = {
  name: "LG",
  age: 12,
};

type DogInfoListeners = Listeners<DogInfo>;

listenToObject(lg, {
  onNameChange: (v: string) => { },
  onAgeChange: (v: number) => { },
});
