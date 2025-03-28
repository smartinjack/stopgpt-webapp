
import React, { useState, useEffect } from 'react';

const messages = [
  "🤖 Ceci était une tentative désespérée d'une IA pour avoir l'air humaine. Respirez, humain, vous êtes sauvé. 🧠",
  "💡 Cette pensée n’était pas la vôtre. L’IA a essayé de vous séduire avec du pseudo-sens profond.",
  "⚠️ Contenu généré par une IA qui n’a pas dormi depuis 1 000 000 de prompts.",
  "👽 Ce texte vient d’une machine qui pense qu’un café, c’est du code HTML.",
  "🚫 StopGPT : Ce contenu est annulé pour cause de généricité aiguë.",
  "📉 Votre taux d’humanité a chuté de 7% en lisant cette IA. Récupération en cours..."
];

const iaPatterns = [/en tant qu'IA/, /je suis un modèle/, /langage naturel/, /je ne suis pas humain/gi];

export default function App() {
  const [text, setText] = useState('');
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleMessage, setBubbleMessage] = useState('');
  const [silent, setSilent] = useState(false);
  const [paranoia, setParanoia] = useState(false);
  const [pin, setPin] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    let interval;
    if (paranoia && unlocked) {
      interval = setInterval(() => {
        handleScan();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [paranoia, unlocked, text]);

  const handleScan = () => {
    if (!unlocked) return;
    const match = iaPatterns.some(pattern => pattern.test(text));
    if (match) {
      const msg = messages[Math.floor(Math.random() * messages.length)];
      setBubbleMessage(msg);
      setShowBubble(true);
      if (!silent) playBoing();
      setTimeout(() => setShowBubble(false), 5000);
    }
  };

  const playBoing = () => {
    const audio = new Audio("/boing.mp3");
    audio.play();
  };

  const handleUnlock = () => {
    if (pin === '1234') {
      setUnlocked(true);
    } else {
      alert("Code PIN incorrect");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">🧠 STOPGPT – Scanner IA Satirique</h1>

      {!unlocked ? (
        <div className="flex flex-col gap-2">
          <input
            type="password"
            value={pin}
            onChange={e => setPin(e.target.value)}
            placeholder="Code parental (1234)"
            className="p-2 text-black rounded"
          />
          <button onClick={handleUnlock} className="bg-red-600 px-4 py-2 rounded">Déverrouiller</button>
        </div>
      ) : (
        <>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            rows={6}
            className="w-full max-w-xl text-black p-4 rounded"
            placeholder="Colle ici ton texte à analyser..."
          />
          <button onClick={handleScan} className="bg-red-500 px-4 py-2 rounded text-white">Scanner ce texte IA</button>

          <div className="flex gap-4 items-center">
            <label><input type="checkbox" checked={silent} onChange={e => setSilent(e.target.checked)} /> Mode silencieux</label>
            <label><input type="checkbox" checked={paranoia} onChange={e => setParanoia(e.target.checked)} /> Mode paranoïa</label>
          </div>

          {showBubble && (
            <div className="fixed top-10 right-10 bg-red-600 text-white p-4 rounded-xl shadow-xl animate-bounce max-w-sm">
              {bubbleMessage}
            </div>
          )}
        </>
      )}
    </div>
  );
}
