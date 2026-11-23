import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
  Upload,
  Lock,
  Unlock,
  Search,
  Music,
  Trash2,
  X,
  Image as ImageIcon,
  FileAudio,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Palette
} from 'lucide-react';

// --- CATEGORY & THEME PRESETS ---
const CATEGORY_THEMES = {
  all: {
    id: 'all',
    label: 'All Beats (Neon Red & Green)',
    badge: 'DIDDYBLUD SIGNATURE',
    bgGradient: 'radial-gradient(circle at 15% 20%, rgba(0, 255, 102, 0.16), transparent 45%), radial-gradient(circle at 85% 80%, rgba(255, 0, 60, 0.18), transparent 45%), #050806',
    primary: '#00ff66',
    secondary: '#ff003c',
    cardBorder: 'rgba(0, 255, 102, 0.25)',
    glowPrimary: '0 0 25px rgba(0, 255, 102, 0.4)',
    glowSecondary: '0 0 25px rgba(255, 0, 60, 0.4)',
    barColors: ['#00ff66', '#ff003c']
  },
  neon: {
    id: 'neon',
    label: 'Neon Red & Green',
    badge: 'TOXIC CYBER',
    bgGradient: 'radial-gradient(circle at 20% 80%, rgba(0, 255, 102, 0.22), transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 0, 60, 0.22), transparent 50%), #040705',
    primary: '#00ff66',
    secondary: '#ff003c',
    cardBorder: 'rgba(255, 0, 60, 0.35)',
    glowPrimary: '0 0 30px rgba(0, 255, 102, 0.5)',
    glowSecondary: '0 0 30px rgba(255, 0, 60, 0.5)',
    barColors: ['#00ff66', '#ff003c']
  },
  jazz: {
    id: 'jazz',
    label: 'Midnight Jazz',
    badge: 'VELVET LOUNGE',
    bgGradient: 'radial-gradient(circle at 30% 20%, rgba(245, 158, 11, 0.22), transparent 50%), radial-gradient(circle at 75% 85%, rgba(180, 83, 9, 0.25), transparent 55%), #0d0804',
    primary: '#fbbf24',
    secondary: '#d97706',
    cardBorder: 'rgba(251, 191, 36, 0.3)',
    glowPrimary: '0 0 25px rgba(251, 191, 36, 0.4)',
    glowSecondary: '0 0 25px rgba(217, 119, 6, 0.4)',
    barColors: ['#fbbf24', '#f59e0b']
  },
  christmas: {
    id: 'christmas',
    label: 'Christmas & Holiday',
    badge: 'FESTIVE EDITION',
    bgGradient: 'radial-gradient(circle at 20% 20%, rgba(220, 38, 38, 0.28), transparent 50%), radial-gradient(circle at 80% 75%, rgba(16, 185, 129, 0.25), transparent 50%), #070d0a',
    primary: '#ef4444',
    secondary: '#10b981',
    cardBorder: 'rgba(239, 68, 68, 0.35)',
    glowPrimary: '0 0 25px rgba(239, 68, 68, 0.45)',
    glowSecondary: '0 0 25px rgba(16, 185, 129, 0.45)',
    barColors: ['#ef4444', '#10b981']
  },
  cyber: {
    id: 'cyber',
    label: 'Cyber Neon',
    badge: 'ELECTRIC GRID',
    bgGradient: 'radial-gradient(circle at 15% 25%, rgba(6, 182, 212, 0.24), transparent 50%), radial-gradient(circle at 85% 75%, rgba(236, 72, 153, 0.24), transparent 50%), #050711',
    primary: '#22d3ee',
    secondary: '#f472b6',
    cardBorder: 'rgba(34, 211, 238, 0.3)',
    glowPrimary: '0 0 25px rgba(34, 211, 238, 0.45)',
    glowSecondary: '0 0 25px rgba(244, 114, 182, 0.45)',
    barColors: ['#22d3ee', '#f472b6']
  },
  lofi: {
    id: 'lofi',
    label: 'Lo-Fi Sunset',
    badge: 'CHILL VIBES',
    bgGradient: 'radial-gradient(circle at 25% 20%, rgba(251, 113, 133, 0.22), transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.24), transparent 50%), #0e0712',
    primary: '#fb7185',
    secondary: '#a78bfa',
    cardBorder: 'rgba(251, 113, 133, 0.3)',
    glowPrimary: '0 0 25px rgba(251, 113, 133, 0.4)',
    glowSecondary: '0 0 25px rgba(167, 139, 250, 0.4)',
    barColors: ['#fb7185', '#a78bfa']
  },
  trap: {
    id: 'trap',
    label: 'Trap & Dark Bass',
    badge: '808 HEAVY',
    bgGradient: 'radial-gradient(circle at 50% 15%, rgba(225, 29, 72, 0.28), transparent 55%), radial-gradient(circle at 50% 90%, rgba(127, 29, 29, 0.3), transparent 55%), #090304',
    primary: '#ff003c',
    secondary: '#9f1239',
    cardBorder: 'rgba(255, 0, 60, 0.35)',
    glowPrimary: '0 0 30px rgba(255, 0, 60, 0.5)',
    glowSecondary: '0 0 25px rgba(159, 18, 57, 0.5)',
    barColors: ['#ff003c', '#fda4af']
  },
  synthwave: {
    id: 'synthwave',
    label: 'Retro Synthwave',
    badge: '80S NIGHTDRIVE',
    bgGradient: 'radial-gradient(circle at 20% 25%, rgba(232, 121, 249, 0.24), transparent 50%), radial-gradient(circle at 80% 75%, rgba(249, 115, 22, 0.24), transparent 50%), #0c0414',
    primary: '#e879f9',
    secondary: '#fb923c',
    cardBorder: 'rgba(232, 121, 249, 0.3)',
    glowPrimary: '0 0 25px rgba(232, 121, 249, 0.45)',
    glowSecondary: '0 0 25px rgba(251, 146, 60, 0.45)',
    barColors: ['#e879f9', '#fb923c']
  }
};

// --- INDEXEDDB HELPERS ---
const DB_NAME = 'DiddyBludBeatsDB';
const STORE_NAME = 'tracks';
const DB_VERSION = 1;

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getAllTracksFromDB() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

async function saveTrackToDB(track) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(track);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

async function deleteTrackFromDB(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

// --- FORMAT TIME ---
function formatTime(secs) {
  if (!secs || isNaN(secs)) return '0:00';
  const mins = Math.floor(secs / 60);
  const rem = Math.floor(secs % 60);
  return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
}

export default function App() {
  const [tracks, setTracks] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  // Password & Upload Modal States
  const [isUnlocked, setIsUnlocked] = useState(() => sessionStorage.getItem('dbb_unlocked') === 'true');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Form States
  const [songTitle, setSongTitle] = useState('');
  const [artistName, setArtistName] = useState('DIDDYBLUDBEATS');
  const [selectedUploadCategory, setSelectedUploadCategory] = useState('neon');
  const [audioFile, setAudioFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState('');

  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const animationFrameRef = useRef(null);

  const currentTheme = CATEGORY_THEMES[activeCategory] || CATEGORY_THEMES.all;

  // Load tracks from IndexedDB on mount
  useEffect(() => {
    let isMounted = true;
    getAllTracksFromDB().then((savedTracks) => {
      if (!isMounted) return;
      const hydrated = savedTracks.map((t) => ({
        ...t,
        audioUrl: t.audioBlob ? URL.createObjectURL(t.audioBlob) : '',
        coverUrl: t.coverBlob ? URL.createObjectURL(t.coverBlob) : null,
      }));
      hydrated.sort((a, b) => b.createdAt - a.createdAt);
      setTracks(hydrated);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Filtered tracks
  const filteredTracks = useMemo(() => {
    return tracks.filter((track) => {
      const matchesCat = activeCategory === 'all' || track.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        track.title.toLowerCase().includes(q) ||
        track.artist.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [tracks, activeCategory, searchQuery]);

  const currentTrack = useMemo(
    () => tracks.find((t) => t.id === currentTrackId) || null,
    [tracks, currentTrackId]
  );

  // Setup Web Audio Visualizer
  const initAudioVisualizer = () => {
    if (!audioRef.current || audioContextRef.current) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(ctx.destination);
      audioContextRef.current = ctx;
      analyserRef.current = analyser;
      sourceNodeRef.current = source;
    } catch (err) {
      console.warn('Visualizer initialization skipped:', err);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const renderFrame = () => {
      animationFrameRef.current = requestAnimationFrame(renderFrame);
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const barCount = 48;
      const barWidth = (width / barCount) * 0.68;
      const gap = (width / barCount) * 0.32;

      let dataArray = new Uint8Array(barCount);
      if (analyserRef.current && isPlaying) {
        const bufferLength = analyserRef.current.frequencyBinCount;
        const fullData = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(fullData);
        for (let i = 0; i < barCount; i++) {
          dataArray[i] = fullData[i] || 0;
        }
      } else if (isPlaying) {
        for (let i = 0; i < barCount; i++) {
          dataArray[i] = Math.abs(Math.sin(Date.now() * 0.005 + i * 0.4)) * 160 + 30;
        }
      } else {
        for (let i = 0; i < barCount; i++) {
          dataArray[i] = 10;
        }
      }

      for (let i = 0; i < barCount; i++) {
        const val = dataArray[i] / 255;
        const barHeight = Math.max(4, val * height * 0.9);
        const x = i * (barWidth + gap);
        const y = height - barHeight;

        const grad = ctx.createLinearGradient(0, y, 0, height);
        grad.addColorStop(0, currentTheme.barColors[0]);
        grad.addColorStop(1, currentTheme.barColors[1]);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 4);
        ctx.fill();
      }
    };

    renderFrame();
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, currentTheme]);

  // Playback Controls
  const playTrack = (track) => {
    initAudioVisualizer();
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    if (currentTrackId === track.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentTrackId(track.id);
      setIsPlaying(true);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch(() => setIsPlaying(false));
        }
      }, 50);
    }
  };

  const handleNext = () => {
    if (filteredTracks.length === 0) return;
    if (isShuffle) {
      const randomIdx = Math.floor(Math.random() * filteredTracks.length);
      playTrack(filteredTracks[randomIdx]);
      return;
    }
    const idx = filteredTracks.findIndex((t) => t.id === currentTrackId);
    const nextIdx = (idx + 1) % filteredTracks.length;
    playTrack(filteredTracks[nextIdx]);
  };

  const handlePrev = () => {
    if (filteredTracks.length === 0) return;
    if (currentTime > 3 && audioRef.current) {
      audioRef.current.currentTime = 0;
      return;
    }
    const idx = filteredTracks.findIndex((t) => t.id === currentTrackId);
    const prevIdx = (idx - 1 + filteredTracks.length) % filteredTracks.length;
    playTrack(filteredTracks[prevIdx]);
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    setIsMuted(newVol === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume || 0.8;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  // Password Verification
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === '67diddy') {
      setIsUnlocked(true);
      sessionStorage.setItem('dbb_unlocked', 'true');
      setPasswordError('');
      setPasswordInput('');
    } else {
      setPasswordError('Incorrect studio password. Access denied.');
    }
  };

  const handleLockStudio = () => {
    setIsUnlocked(false);
    sessionStorage.removeItem('dbb_unlocked');
    setShowUploadModal(false);
  };

  // Cover Art File Selection
  const handleCoverChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    const url = URL.createObjectURL(file);
    setCoverPreview(url);
  };

  // Audio File Selection
  const handleAudioChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAudioFile(file);
    if (!songTitle) {
      const cleanName = file.name.replace(/\.[^/.]+$/, '');
      setSongTitle(cleanName);
    }
  };

  // Upload Song Handler
  const handleUploadTrack = async (e) => {
    e.preventDefault();
    if (!audioFile) return;

    setIsUploading(true);
    try {
      const id = `track_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      const newTrackRecord = {
        id,
        title: songTitle.trim() || audioFile.name.replace(/\.[^/.]+$/, ''),
        artist: artistName.trim() || 'DIDDYBLUDBEATS',
        category: selectedUploadCategory,
        audioBlob: audioFile,
        coverBlob: coverFile || null,
        createdAt: Date.now(),
      };

      await saveTrackToDB(newTrackRecord);

      const hydratedTrack = {
        ...newTrackRecord,
        audioUrl: URL.createObjectURL(audioFile),
        coverUrl: coverFile ? URL.createObjectURL(coverFile) : null,
      };

      setTracks((prev) => [hydratedTrack, ...prev]);
      setUploadSuccess('Beat uploaded to DIDDYBLUDBEATS Library!');
      setSongTitle('');
      setAudioFile(null);
      setCoverFile(null);
      setCoverPreview(null);

      setTimeout(() => {
        setUploadSuccess('');
        setShowUploadModal(false);
      }, 1100);
    } catch (err) {
      console.error('Error saving track:', err);
    } finally {
      setIsUploading(false);
    }
  };

  // Delete Track
  const handleDeleteTrack = async (e, id) => {
    e.stopPropagation();
    await deleteTrackFromDB(id);
    if (currentTrackId === id) {
      if (audioRef.current) audioRef.current.pause();
      setIsPlaying(false);
      setCurrentTrackId(null);
    }
    setTracks((prev) => prev.filter((t) => t.id !== id));
  };

  // Snowflakes memoized for Christmas theme
  const snowflakes = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 6 + 4}px`,
        duration: `${Math.random() * 7 + 6}s`,
        delay: `${Math.random() * 5}s`,
      })),
    []
  );

  return (
    <div
      className="min-h-screen text-white transition-all duration-700 flex flex-col relative overflow-x-hidden pb-32"
      style={{ background: currentTheme.bgGradient }}
    >
      {/* Christmas Snow Effect */}
      {activeCategory === 'christmas' && (
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
          {snowflakes.map((flake) => (
            <div
              key={flake.id}
              className="absolute rounded-full bg-white/80 animate-snow"
              style={{
                left: flake.left,
                width: flake.size,
                height: flake.size,
                animationDuration: flake.duration,
                animationDelay: flake.delay,
                boxShadow: '0 0 8px rgba(255,255,255,0.8)',
              }}
            />
          ))}
        </div>
      )}

      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack?.audioUrl || ''}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={() => {
          if (isRepeat && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          } else {
            handleNext();
          }
        }}
      />

      {/* TOP HEADER */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-black/55 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-lg tracking-tighter transition-all duration-500 animate-pulse"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
                boxShadow: currentTheme.glowPrimary,
                color: '#050806',
              }}
            >
              DB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#00ff66] via-white to-[#ff003c]">
                  DIDDYBLUDBEATS
                </h1>
                <span
                  className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border"
                  style={{
                    borderColor: currentTheme.primary,
                    color: currentTheme.primary,
                    backgroundColor: 'rgba(0,0,0,0.4)',
                  }}
                >
                  {currentTheme.badge}
                </span>
              </div>
              <p className="text-xs text-gray-400">Official Beat Vault & Audio Studio</p>
            </div>
          </div>

          {/* Search & Studio Upload Controls */}
          <div className="flex items-center gap-3 flex-1 sm:flex-initial justify-end">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search beats or artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white/30 transition"
              />
            </div>

            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm text-black transition-all duration-300 hover:scale-105 active:scale-95 shrink-0"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
                boxShadow: currentTheme.glowPrimary,
              }}
            >
              {isUnlocked ? <Upload className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              <span>Upload Beat</span>
            </button>

            {isUnlocked && (
              <button
                onClick={handleLockStudio}
                title="Lock Studio"
                className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/40 text-gray-300 hover:text-red-400 transition"
              >
                <Unlock className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 flex-1 z-10">
        {/* Category Theme Switcher Bar */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            <Palette className="w-4 h-4" style={{ color: currentTheme.primary }} />
            <span>Category Vibe & Color Templates</span>
          </div>
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2">
            {Object.values(CATEGORY_THEMES).map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 border flex items-center gap-2 ${
                    active
                      ? 'scale-105 text-black'
                      : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                  style={
                    active
                      ? {
                          background: `linear-gradient(135deg, ${cat.primary}, ${cat.secondary})`,
                          borderColor: 'transparent',
                          boxShadow: cat.glowPrimary,
                        }
                      : {}
                  }
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor: active ? '#050806' : cat.primary,
                    }}
                  />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Visualizer Banner */}
        <div
          className="rounded-2xl p-5 mb-8 backdrop-blur-md bg-black/45 border transition-all duration-500 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            borderColor: currentTheme.cardBorder,
            boxShadow: isPlaying ? currentTheme.glowPrimary : 'none',
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden border border-white/15"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.primary}33, ${currentTheme.secondary}33)`,
              }}
            >
              {currentTrack?.coverUrl ? (
                <img
                  src={currentTrack.coverUrl}
                  alt={currentTrack.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Music className="w-7 h-7" style={{ color: currentTheme.primary }} />
              )}
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                {currentTrack ? 'Now Spinning' : 'Studio Standby'}
              </p>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                {currentTrack ? currentTrack.title : 'Select or Upload a Track'}
              </h2>
              <p className="text-xs text-gray-400">
                {currentTrack
                  ? `${currentTrack.artist} • ${CATEGORY_THEMES[currentTrack.category]?.label || 'Beat'}`
                  : 'DIDDYBLUDBEATS Library Ready'}
              </p>
            </div>
          </div>

          {/* Canvas Equalizer */}
          <div className="w-full sm:w-80 h-14 bg-black/40 rounded-xl p-2 border border-white/5 flex items-center justify-center">
            <canvas ref={canvasRef} width={300} height={44} className="w-full h-full" />
          </div>
        </div>

        {/* SONG LIBRARY GRID */}
        {filteredTracks.length === 0 ? (
          <div
            className="rounded-3xl border border-dashed p-12 text-center backdrop-blur-md bg-black/35 transition-all duration-500 flex flex-col items-center justify-center my-8"
            style={{ borderColor: currentTheme.cardBorder }}
          >
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 animate-bounce"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.primary}25, ${currentTheme.secondary}25)`,
                border: `1px solid ${currentTheme.primary}55`,
                boxShadow: currentTheme.glowPrimary,
              }}
            >
              <Music className="w-10 h-10" style={{ color: currentTheme.primary }} />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">
              {tracks.length === 0
                ? 'Your DIDDYBLUDBEATS Vault is Empty'
                : 'No Tracks in This Category Yet'}
            </h3>
            <p className="text-gray-400 max-w-md text-sm mb-6">
              Unlock the Producer Studio with your studio password to upload custom MP3 tracks and matching PNG cover artwork.
            </p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-6 py-3 rounded-xl font-extrabold text-sm text-black flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
                boxShadow: currentTheme.glowPrimary,
              }}
            >
              <Upload className="w-4 h-4" />
              <span>Upload Your First Beat</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTracks.map((track) => {
              const isCurrent = currentTrackId === track.id;
              const catInfo = CATEGORY_THEMES[track.category] || CATEGORY_THEMES.neon;

              return (
                <div
                  key={track.id}
                  onClick={() => playTrack(track)}
                  className="group relative rounded-2xl overflow-hidden bg-black/50 backdrop-blur-md border transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col"
                  style={{
                    borderColor: isCurrent ? currentTheme.primary : 'rgba(255,255,255,0.1)',
                    boxShadow: isCurrent ? currentTheme.glowPrimary : 'none',
                  }}
                >
                  {/* Cover Art */}
                  <div className="relative aspect-square w-full overflow-hidden bg-black/60">
                    {track.coverUrl ? (
                      <img
                        src={track.coverUrl}
                        alt={track.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex flex-col items-center justify-center p-4"
                        style={{
                          background: `linear-gradient(135deg, ${catInfo.primary}30, ${catInfo.secondary}30)`,
                        }}
                      >
                        <Music className="w-16 h-16 opacity-80" style={{ color: catInfo.primary }} />
                        <span className="text-[10px] font-bold uppercase tracking-widest mt-2 text-white/60">
                          DIDDYBLUDBEATS
                        </span>
                      </div>
                    )}

                    {/* Play Overlay */}
                    <div
                      className={`absolute inset-0 bg-black/45 flex items-center justify-center transition-opacity duration-300 ${
                        isCurrent && isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center text-black transition-transform duration-300 hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, ${catInfo.primary}, ${catInfo.secondary})`,
                          boxShadow: catInfo.glowPrimary,
                        }}
                      >
                        {isCurrent && isPlaying ? (
                          <Pause className="w-6 h-6 fill-current" />
                        ) : (
                          <Play className="w-6 h-6 fill-current ml-0.5" />
                        )}
                      </div>
                    </div>

                    {/* Category Pill */}
                    <span
                      className="absolute top-3 left-3 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md bg-black/70 border"
                      style={{
                        borderColor: catInfo.primary,
                        color: catInfo.primary,
                      }}
                    >
                      {catInfo.label}
                    </span>

                    {/* Delete Button (Visible when studio unlocked) */}
                    {isUnlocked && (
                      <button
                        onClick={(e) => handleDeleteTrack(e, track.id)}
                        title="Delete Track"
                        className="absolute top-3 right-3 p-2 rounded-full bg-black/75 text-red-400 hover:bg-red-600 hover:text-white transition opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-base text-white truncate group-hover:text-[#00ff66] transition">
                        {track.title}
                      </h3>
                      <p className="text-xs text-gray-400 truncate mt-0.5">{track.artist}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* BOTTOM AUDIO PLAYER BAR */}
      <footer className="fixed bottom-0 inset-x-0 z-40 backdrop-blur-2xl bg-black/80 border-t border-white/10 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Track Info */}
          <div className="flex items-center gap-3 w-full sm:w-1/4 min-w-0">
            <div className="w-11 h-11 rounded-lg overflow-hidden bg-white/5 border border-white/10 shrink-0 flex items-center justify-center">
              {currentTrack?.coverUrl ? (
                <img src={currentTrack.coverUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <Music className="w-5 h-5" style={{ color: currentTheme.primary }} />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">
                {currentTrack ? currentTrack.title : 'No Track Loaded'}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {currentTrack ? currentTrack.artist : 'DIDDYBLUDBEATS'}
              </p>
            </div>
          </div>

          {/* Center Playback & Scrubber */}
          <div className="flex flex-col items-center w-full sm:w-2/4 max-w-xl">
            <div className="flex items-center gap-5 mb-1.5">
              <button
                onClick={() => setIsShuffle(!isShuffle)}
                className={`transition ${isShuffle ? 'text-[#00ff66]' : 'text-gray-400 hover:text-white'}`}
              >
                <Shuffle className="w-4 h-4" />
              </button>
              <button
                onClick={handlePrev}
                className="text-gray-300 hover:text-white transition"
              >
                <SkipBack className="w-5 h-5" />
              </button>
              <button
                onClick={() => currentTrack && playTrack(currentTrack)}
                disabled={!currentTrack}
                className="w-10 h-10 rounded-full flex items-center justify-center text-black transition-transform hover:scale-105 active:scale-95 disabled:opacity-40"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
                  boxShadow: currentTheme.glowPrimary,
                }}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                )}
              </button>
              <button
                onClick={handleNext}
                className="text-gray-300 hover:text-white transition"
              >
                <SkipForward className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsRepeat(!isRepeat)}
                className={`transition ${isRepeat ? 'text-[#ff003c]' : 'text-gray-400 hover:text-white'}`}
              >
                <Repeat className="w-4 h-4" />
              </button>
            </div>

            <div className="w-full flex items-center gap-2.5 text-[11px] text-gray-400 font-mono">
              <span>{formatTime(currentTime)}</span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                disabled={!currentTrack}
                className="w-full h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-[#00ff66]"
              />
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="hidden sm:flex items-center justify-end gap-2 w-1/4">
            <button onClick={toggleMute} className="text-gray-400 hover:text-white transition">
              {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-24 h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-[#ff003c]"
            />
          </div>
        </div>
      </footer>

      {/* UPLOAD & PASSWORD MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div
            className="w-full max-w-md rounded-3xl bg-[#0a0f0c] border p-6 relative shadow-2xl"
            style={{
              borderColor: currentTheme.primary,
              boxShadow: currentTheme.glowPrimary,
            }}
          >
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>

            {!isUnlocked ? (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#ff003c]/20 border border-[#ff003c]/40 flex items-center justify-center text-[#ff003c]">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">Producer Studio Lock</h3>
                    <p className="text-xs text-gray-400">Enter password to upload MP3 & PNG files</p>
                  </div>
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Enter studio password..."
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    autoFocus
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00ff66]"
                  />
                  {passwordError && (
                    <p className="text-xs text-[#ff003c] mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {passwordError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-extrabold text-sm text-black transition-transform hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, #00ff66, #ff003c)',
                  }}
                >
                  Unlock Studio
                </button>
              </form>
            ) : (
              <form onSubmit={handleUploadTrack} className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-[#00ff66]" />
                  <h3 className="text-lg font-black text-white">Upload to DIDDYBLUDBEATS</h3>
                </div>

                {uploadSuccess && (
                  <div className="p-3 rounded-xl bg-[#00ff66]/15 border border-[#00ff66]/40 text-[#00ff66] text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    {uploadSuccess}
                  </div>
                )}

                {/* Track Title */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Track Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Neon Demon 808"
                    value={songTitle}
                    onChange={(e) => setSongTitle(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00ff66]"
                  />
                </div>

                {/* Artist & Category */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Producer / Artist</label>
                    <input
                      type="text"
                      value={artistName}
                      onChange={(e) => setArtistName(e.target.value)}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00ff66]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Category Vibe</label>
                    <select
                      value={selectedUploadCategory}
                      onChange={(e) => setSelectedUploadCategory(e.target.value)}
                      className="w-full bg-[#0d1410] border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00ff66]"
                    >
                      {Object.values(CATEGORY_THEMES)
                        .filter((c) => c.id !== 'all')
                        .map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.label}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                {/* MP3 File Input */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Audio File (MP3 / WAV)</label>
                  <label className="flex items-center justify-center gap-2 w-full p-3 rounded-xl border border-dashed border-white/25 hover:border-[#00ff66] bg-white/5 cursor-pointer transition text-xs text-gray-300">
                    <FileAudio className="w-4 h-4 text-[#00ff66]" />
                    <span className="truncate">{audioFile ? audioFile.name : 'Choose MP3 Audio File'}</span>
                    <input
                      type="file"
                      accept="audio/*"
                      required
                      onChange={handleAudioChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* PNG Cover Art Input */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Cover Art (PNG / JPG)</label>
                  <div className="flex items-center gap-3">
                    <label className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-white/25 hover:border-[#ff003c] bg-white/5 cursor-pointer transition text-xs text-gray-300">
                      <ImageIcon className="w-4 h-4 text-[#ff003c]" />
                      <span className="truncate">{coverFile ? coverFile.name : 'Choose PNG Cover Image'}</span>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleCoverChange}
                        className="hidden"
                      />
                    </label>
                    {coverPreview && (
                      <img
                        src={coverPreview}
                        alt="Preview"
                        className="w-11 h-11 rounded-xl object-cover border border-white/20"
                      />
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isUploading || !audioFile}
                  className="w-full py-3 rounded-xl font-extrabold text-sm text-black transition-transform hover:scale-[1.02] disabled:opacity-50"
                  style={{
                    background: 'linear-gradient(135deg, #00ff66, #ff003c)',
                  }}
                >
                  {isUploading ? 'Saving to Vault...' : 'Publish Beat'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
