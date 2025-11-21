import React, { useState, createContext } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';

// Pages
import Home from './pages/Home';
import Tips from './pages/Tips';
import { About, Privacy, Terms, Contact, Cookies } from './pages/Legal';

// Tool Pages
import { 
  QRCodeTool, HashtagTool, UsernameTool, RandomNameTool, 
  PasswordTool, EmojiTool, ColorTool, NumberTool, 
  FancyTextTool, WordCounterTool, RandomWordTool,
  RemoveSpacesTool, CaseConverterTool, ReverseTextTool,
  TextToEmojiTool, DuplicateRemoverTool, SortLinesTool,
  AgeCalculatorTool, PercentageCalculatorTool, UnitConverterTool,
  ColorPickerTool, GradientTool, PasswordStrengthTool,
  UrlShortenerTool, MemeMakerTool, JokeTool, TriviaTool,
  DiceTool, WheelTool, EmojiToTextTool,
  LoremIpsumTool, RandomDateTool, LoremEmojiTool, RandomQuoteTool,
  QrScannerTool, BinaryConverterTool, MorseTool, HtmlEncoderTool,
  UrlEncoderTool, Base64Tool
} from './pages/Tools';

// Search Context
export const SearchContext = createContext<{ query: string; setQuery: (q: string) => void }>({ query: '', setQuery: () => {} });

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  const [query, setQuery] = useState('');

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tips" element={<Tips />} />
            
            {/* Legal */}
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cookies" element={<Cookies />} />

            {/* Tools Routes */}
            <Route path="/tools/qr" element={<QRCodeTool />} />
            <Route path="/tools/hashtags" element={<HashtagTool />} />
            <Route path="/tools/usernames" element={<UsernameTool />} />
            <Route path="/tools/random-name" element={<RandomNameTool />} />
            <Route path="/tools/password" element={<PasswordTool />} />
            <Route path="/tools/emoji" element={<EmojiTool />} />
            <Route path="/tools/color" element={<ColorTool />} />
            <Route path="/tools/number" element={<NumberTool />} />
            <Route path="/tools/fancy-text" element={<FancyTextTool />} />
            <Route path="/tools/word-counter" element={<WordCounterTool />} />
            <Route path="/tools/random-word" element={<RandomWordTool />} />
            <Route path="/tools/remove-spaces" element={<RemoveSpacesTool />} />
            <Route path="/tools/case-converter" element={<CaseConverterTool />} />
            <Route path="/tools/reverse-text" element={<ReverseTextTool />} />
            <Route path="/tools/emoji-to-text" element={<EmojiToTextTool />} />
            <Route path="/tools/text-to-emoji" element={<TextToEmojiTool />} />
            <Route path="/tools/duplicate-remover" element={<DuplicateRemoverTool />} />
            <Route path="/tools/sort-lines" element={<SortLinesTool />} />
            <Route path="/tools/age-calculator" element={<AgeCalculatorTool />} />
            <Route path="/tools/percentage-calculator" element={<PercentageCalculatorTool />} />
            <Route path="/tools/unit-converter" element={<UnitConverterTool />} />
            <Route path="/tools/color-picker" element={<ColorPickerTool />} />
            <Route path="/tools/gradient" element={<GradientTool />} />
            <Route path="/tools/password-strength" element={<PasswordStrengthTool />} />
            <Route path="/tools/url-shortener" element={<UrlShortenerTool />} />
            <Route path="/tools/meme-maker" element={<MemeMakerTool />} />
            <Route path="/tools/joke" element={<JokeTool />} />
            <Route path="/tools/trivia" element={<TriviaTool />} />
            <Route path="/tools/dice" element={<DiceTool />} />
            <Route path="/tools/wheel" element={<WheelTool />} />
            
            {/* New Tools */}
            <Route path="/tools/lorem-ipsum" element={<LoremIpsumTool />} />
            <Route path="/tools/random-date" element={<RandomDateTool />} />
            <Route path="/tools/lorem-emoji" element={<LoremEmojiTool />} />
            <Route path="/tools/quote" element={<RandomQuoteTool />} />
            <Route path="/tools/qr-scanner" element={<QrScannerTool />} />
            <Route path="/tools/binary" element={<BinaryConverterTool />} />
            <Route path="/tools/morse" element={<MorseTool />} />
            <Route path="/tools/html-encoder" element={<HtmlEncoderTool />} />
            <Route path="/tools/url-encoder" element={<UrlEncoderTool />} />
            <Route path="/tools/base64" element={<Base64Tool />} />
          </Routes>
        </Layout>
      </Router>
    </SearchContext.Provider>
  );
};

export default App;