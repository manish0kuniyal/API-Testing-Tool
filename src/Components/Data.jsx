// Data.jsx
export const fakeProgressData = generateFakeProgressData();

// Alternatively, if the function itself is exported
export function generateFakeProgressData() {
  let progress = 0; // Start from 0 or any baseline value
  const data = [];
  for (let i = 0; i < 30; i++) {
    const action = Math.random() > 0.5 ? 1 : -1; // Randomly decide to increase or decrease
    progress += action;
    data.push(progress);
  }
  return data;
}
