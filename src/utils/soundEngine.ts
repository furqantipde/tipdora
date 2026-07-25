/**
 * Ultra-realistic ASMR Web Audio Synthesizer for Chess Sound Design & Ambient Soundscapes
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private sfxVolume: number = 0.8;
  private bgmVolume: number = 0.3;
  private ambientGainNode: GainNode | null = null;
  private ambientNodes: AudioNode[] = [];
  private currentAmbientType: string | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    if (!enabled && this.ambientGainNode) {
      this.ambientGainNode.gain.value = 0;
    } else if (enabled && this.ambientGainNode) {
      this.ambientGainNode.gain.value = this.bgmVolume;
    }
  }

  public setSfxVolume(vol: number) {
    this.sfxVolume = Math.max(0, Math.min(1, vol));
  }

  public setBgmVolume(vol: number) {
    this.bgmVolume = Math.max(0, Math.min(1, vol));
    if (this.ambientGainNode) {
      this.ambientGainNode.gain.setValueAtTime(this.bgmVolume, this.ctx?.currentTime || 0);
    }
  }

  // --- Sound Effects ---

  /** Tactile wooden or felt board impact when a piece is moved */
  public playMoveSound(pieceMaterial: 'wood' | 'metal' | 'crystal' = 'wood') {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    if (pieceMaterial === 'metal') {
      // Metallic soft clink
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);

      gain.gain.setValueAtTime(this.sfxVolume * 0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);

      // Metallic impact thud
      this.playWoodThud(now, 180, 0.06, 0.5);
    } else if (pieceMaterial === 'crystal') {
      // High delicate crystal chime ring + soft placement
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2200, now);
      osc.frequency.exponentialRampToValueAtTime(1100, now + 0.12);

      gain.gain.setValueAtTime(this.sfxVolume * 0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);

      this.playWoodThud(now, 220, 0.05, 0.3);
    } else {
      // Standard heavy wooden piece placement on felt/wood
      this.playWoodThud(now, 140, 0.08, 0.7);
      // Add felt friction noise
      this.playFrictionNoise(now, 0.04, 0.2);
    }
  }

  /** Capture sound: sharp strike impact with subtle resonant body */
  public playCaptureSound(pieceMaterial: 'wood' | 'metal' | 'crystal' = 'wood') {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Hard impact thud
    this.playWoodThud(now, 260, 0.12, 0.9);
    // Secondary click / wood knock
    this.playClick(now + 0.015, 800, 0.5);

    if (pieceMaterial === 'metal') {
      this.playClick(now + 0.01, 2400, 0.6);
    } else if (pieceMaterial === 'crystal') {
      this.playClick(now + 0.01, 3200, 0.5);
    }
  }

  /** Piece sliding across felt or polished wood */
  public playSlideSound() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    this.playFrictionNoise(now, 0.1, 0.15);
  }

  /** Check alert chime */
  public playCheckSound() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.setValueAtTime(880, now + 0.08); // A5

    gain.gain.setValueAtTime(this.sfxVolume * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  }

  /** Game end / Victory fanfare sound */
  public playVictorySound() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);

      gain.gain.setValueAtTime(this.sfxVolume * 0.4, now + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 0.4);
    });
  }

  /** Error / Illegal move buzzer */
  public playIllegalSound() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.15);

    gain.gain.setValueAtTime(this.sfxVolume * 0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  // --- Helper Synthesizers ---

  private playWoodThud(startTime: number, freq: number, duration: number, volFactor: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);
    osc.frequency.exponentialRampToValueAtTime(40, startTime + duration);

    gain.gain.setValueAtTime(this.sfxVolume * volFactor, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  private playClick(startTime: number, freq: number, volFactor: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, startTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.2, startTime + 0.03);

    gain.gain.setValueAtTime(this.sfxVolume * 0.2 * volFactor, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.03);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + 0.03);
  }

  private playFrictionNoise(startTime: number, duration: number, volFactor: number) {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, startTime);
    filter.Q.setValueAtTime(2, startTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.sfxVolume * 0.25 * volFactor, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(startTime);
  }

  // --- Ambient Audio Soundscapes ---

  public stopAmbient() {
    this.ambientNodes.forEach(node => {
      try {
        if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
          (node as AudioScheduledSourceNode).stop();
        }
        node.disconnect();
      } catch {
        // Ignore disconnect errors
      }
    });
    this.ambientNodes = [];
    this.currentAmbientType = null;
  }

  public startAmbient(type: 'library' | 'rainy' | 'tournament' | 'cafe') {
    if (!this.soundEnabled || this.bgmVolume <= 0) return;
    if (this.currentAmbientType === type) return;

    this.initCtx();
    if (!this.ctx) return;

    this.stopAmbient();
    this.currentAmbientType = type;

    this.ambientGainNode = this.ctx.createGain();
    this.ambientGainNode.gain.setValueAtTime(this.bgmVolume * 0.25, this.ctx.currentTime);
    this.ambientGainNode.connect(this.ctx.destination);

    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    // Pink/Brownish soft background noise generator for ambient room hum
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();

    if (type === 'rainy') {
      filter.type = 'lowpass';
      filter.frequency.value = 600;
    } else if (type === 'library') {
      filter.type = 'lowpass';
      filter.frequency.value = 250;
    } else if (type === 'cafe') {
      filter.type = 'bandpass';
      filter.frequency.value = 450;
      filter.Q.value = 1.2;
    } else { // tournament
      filter.type = 'lowpass';
      filter.frequency.value = 350;
    }

    whiteNoise.connect(filter);
    filter.connect(this.ambientGainNode);
    whiteNoise.start();

    this.ambientNodes.push(whiteNoise, filter);
  }
}

export const soundEngine = new SoundEngine();
