/**
 * Enumration
 */
enum LoadingState {
  beforeLoad = 'beforeLoad',
  loading = "loading",
  loaded = "loaded",
}

const englistLoadingStateds = {
  [LoadingState.beforeLoad]: "Before Load"
}

const isLoading = (state: LoadingState) => state === LoadingState.loading;
console.log(isLoading(LoadingState.beforeLoad));
console.log(englistLoadingStateds[LoadingState.beforeLoad]);

/**
 * Literal types
 * @Numeric Literal
 */

function rollDice(dice: 1 | 2 | 3): number {
  let pip = 0;
  for (let i = 0; i < dice; i++) {
    pip += Math.floor(Math.random() * 5) + 1;
  }
  return pip
}

console.log(rollDice(3));

/**
 * Literal types in Overwriting Overloading
 */

function sendEvent(name: "addToCart", data: { produceId: number }): void;
function sendEvent(name: "checkout", data: { cartCount: number }): void;
function sendEvent(name: string, data: unknown): void {
  console.log(`${name} : ${JSON.stringify(data)}`);
};

sendEvent("addToCart", { produceId: 123 })
