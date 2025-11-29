// Utility functions for tool logic

export const processTextTool = (toolId: string, input: string): string => {
  if (!input) return '';

  switch (toolId) {
    case 'case-converter':
      return input.toUpperCase(); // Simple toggle, UI can be more complex
    case 'reverse-text':
      return input.split('').reverse().join('');
    case 'remove-spaces':
      return input.replace(/\s+/g, ' ').trim();
    case 'duplicate-remover':
      const lines = input.split('\n');
      return [...new Set(lines)].join('\n');
    case 'sort-lines':
      return input.split('\n').sort().join('\n');
    case 'fancy-text':
      const map: Record<string, string> = { a: '𝕒', b: '𝕓', c: '𝕔', d: '𝕕', e: '𝕖', f: '𝕗', g: '𝕘', h: '𝕙', i: '𝕚', j: '𝕛', k: '𝕜', l: '𝕝', m: '𝕞', n: '𝕟', o: '𝕠', p: '𝕡', q: '𝕢', r: '𝕣', s: '𝕤', t: '𝕥', u: '𝕦', v: '𝕧', w: '𝕨', x: '𝕩', y: '𝕪', z: '𝕫' };
      return input.toLowerCase().split('').map(c => map[c] || c).join('');
    case 'binary-converter':
       return input.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
    case 'base64':
        try { return btoa(input); } catch (e) { return 'Error: Invalid input for Base64'; }
    case 'url-encoder':
        return encodeURIComponent(input);
    default:
      return input;
  }
};

export const generateContent = (toolId: string, options?: any): string => {
  switch (toolId) {
    case 'password-gen':
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
      return Array.from({ length: 16 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    case 'random-number':
       return Math.floor(Math.random() * 10000).toString();
    case 'uuid-gen':
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    case 'lorem-ipsum':
        return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    case 'random-word':
        const words = ['Aesthetic', 'Serendipity', 'Nebula', 'Ephemeral', 'Luminous', 'Solitude', 'Aurora', 'Ethereal', 'Tranquil', 'Zenith'];
        return words[Math.floor(Math.random() * words.length)];
    case 'random-joke':
        const jokes = [
          "Why don't scientists trust atoms? Because they make up everything.",
          "Why did the scarecrow win an award? Because he was outstanding in his field.",
          "Parallel lines have so much in common. It’s a shame they’ll never meet.",
          "I told my wife she was drawing her eyebrows too high. She looked surprised.",
          "What do you call a fake noodle? An impasta.",
          "Why did the bicycle fall over? Because it was two-tired.",
          "What do you call a bear with no teeth? A gummy bear.",
          "I'm reading a book on anti-gravity. It's impossible to put down.",
          "What do you call a factory that makes okay products? A satisfactory.",
          "Why can't you hear a pterodactyl go to the bathroom? Because the P is silent.",
          "How do you make a tissue dance? You put a little boogie in it.",
          "What did the janitor say when he jumped out of the closet? Supplies!",
          "Why did the golfer bring two pairs of pants? In case he got a hole in one.",
          "My wife told me to stop impersonating a flamingo. I had to put my foot down.",
          "I used to play piano by ear, but now I use my hands."
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
    default:
      return '';
  }
};

export const calculateResult = (toolId: string, inputs: Record<string, any>): string => {
    if (toolId === 'age-calculator' && inputs.date) {
        const birth = new Date(inputs.date);
        const now = new Date();
        let age = now.getFullYear() - birth.getFullYear();
        const m = now.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
            age--;
        }
        return `${age} years old`;
    }
    if (toolId === 'percentage-calc' && inputs.val && inputs.total) {
        return `${((Number(inputs.val) / Number(inputs.total)) * 100).toFixed(2)}%`;
    }
    return '';
}