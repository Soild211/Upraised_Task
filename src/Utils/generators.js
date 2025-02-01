export const generateCodename = () => {
    const codes = ['The Nightingale', 'The Kraken', 'The Fastest', 'The Drone', 'The Shadow','Mighty','Secret','Serpent'];
    return codes[Math.floor(Math.random() * codes.length)];
  };
  
export  const generateSuccessProbability = () => {
    return Math.floor(Math.random() * 100) + 1;
  };
  
  