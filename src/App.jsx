
import React, { useRef, useState } from "react";
import "./App.css";

// =====================================
// PERSONAL CONTENT — EDIT THIS SECTION
// =====================================

const sisterName = "PAVIIII";

const memories = [
  {
    src: "/photos/photo1.jpg",
    caption: "Neetuu moonjiiii ♡",
  },
  {
    src: "/photos/photo2.jpg",
    caption: "Nandha gopaala😂",
  },
  {
    src: "/photos/photo3.jpg",
    caption: "Idhu knjm nalla photo"
  },
  {
    src: "/photos/photo4.jpg",
    caption: "Ena siripuuu adhuu 😭",
  },
];

const birthdayLetter = `,

Happieee Birthdayyyyy pichiiiiii💗

varthaiaayala unna enaku evloo pudikumm nu solla therlaa.

sollla mudiyaadhu alavukuu unna pudikummm , sorryy for some incidentss.

Epovummmm neenuu sandhosama aaroghyamahh irukanummm ennoda onnahhh.

once againn INIYAA PIRANDHA NAALLL தங்கச்சி 🌍`;

const voiceNote = "/voice-note.mp3";

// =====================================
// MAIN APP
// =====================================

function App() {
  const [stage, setStage] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [photoDirection, setPhotoDirection] = useState("next");
  const [photoKey, setPhotoKey] = useState(0);
  const [blown, setBlown] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);
  const [playing, setPlaying] = useState(false);

  const audioRef = useRef(null);
  const touchStart = useRef(0);

  // Change photos
  const changePhoto = (direction) => {
    if (memories.length <= 1) return;

    setPhotoDirection(direction);
    setPhotoKey((prev) => prev + 1);

    setPhotoIndex((prev) => {
      if (direction === "next") {
        return (prev + 1) % memories.length;
      }

      return (prev - 1 + memories.length) % memories.length;
    });
  };

  // Swipe gallery
  const handleTouchStart = (event) => {
    touchStart.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    const touchEnd = event.changedTouches[0].clientX;
    const difference = touchStart.current - touchEnd;

    if (Math.abs(difference) > 45) {
      changePhoto(difference > 0 ? "next" : "prev");
    }
  };

  // Blow candles
  const blowCandles = () => {
    setBlown(true);
  };

  // Open gift
  const openGift = () => {
    setGiftOpen(true);
  };

  // Voice note
  const toggleAudio = async () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch (error) {
        console.error("Audio could not play:", error);
      }
    }
  };

  const handleAudioEnd = () => {
    setPlaying(false);
  };

  return (
    <main className="app">
      <div className="pixel-stars" aria-hidden="true">
        <span>✦</span>
        <span>✧</span>
        <span>✦</span>
        <span>✧</span>
        <span>✦</span>
        <span>✧</span>
        <span>✦</span>
      </div>

      <div className="screen" key={stage}>

        {/* =================================
            STAGE 0 — OPENING
        ================================= */}

        {stage === 0 && (
          <section className="entry-stage">
            <button
              className="pixel-round-button"
              onClick={() => setStage(1)}
            >
              <span className="pixel-heart">♥</span>
              <span className="entry-button-text">
                IF U R {sisterName.toUpperCase()},
                <br />
                PRESS THE BUTTON
              </span>
            </button>
          </section>
        )}

        {/* =================================
            STAGE 1 — POLAROID GALLERY
        ================================= */}

        {stage === 1 && (
          <section className="gallery-stage">
            <p className="eyebrow">A LITTLE TRIP DOWN MEMORY LANE</p>

            <h1 className="stage-title">
              Our Little <span>Memories</span>
            </h1>

            <div
              className="photo-area"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {memories.length > 0 && (
                <div
                  key={photoKey}
                  className={`polaroid photo-transition ${photoDirection}`}
                >
                  <div className="photo-frame">
                    <img
                      src={memories[photoIndex].src}
                      alt={`Memory ${photoIndex + 1}`}
                    />
                  </div>

                  <p className="photo-caption">
                    {memories[photoIndex].caption}
                  </p>

                  <span className="photo-number">
                    {String(photoIndex + 1).padStart(2, "0")}
                  </span>
                </div>
              )}
            </div>

            <div className="gallery-controls">
              <button
                className="gallery-nav"
                onClick={() => changePhoto("prev")}
                aria-label="Previous photo"
              >
                ←
              </button>

              <span className="photo-counter">
                {String(photoIndex + 1).padStart(2, "0")}
                {" / "}
                {String(memories.length).padStart(2, "0")}
              </span>

              <button
                className="gallery-nav"
                onClick={() => changePhoto("next")}
                aria-label="Next photo"
              >
                →
              </button>
            </div>

            <p className="swipe-hint">
              SWIPE TO SEE MORE MEMORIES
            </p>

            <button
              className="pixel-button"
              onClick={() => setStage(2)}
            >
              NEXT SURPRISE ✦
            </button>
          </section>
        )}

        {/* =================================
            STAGE 2 — BIRTHDAY CAKE
        ================================= */}

        {stage === 2 && (
          <section className="cake-stage">
            <p className="eyebrow">MAKE A WISH</p>

            <h1 className="stage-title">
              Happy Birthday
              <br />
              <span>{sisterName}!</span>
            </h1>

            <div className={`cake ${blown ? "cake-blown" : ""}`}>
              <div className="cake-candles">
                <div className="candle">
                  {!blown && <span className="flame" />}
                </div>
                <div className="candle">
                  {!blown && <span className="flame" />}
                </div>
                <div className="candle">
                  {!blown && <span className="flame" />}
                </div>
              </div>

              <div className="cake-top" />
              <div className="cake-middle" />
              <div className="cake-bottom" />
              <div className="cake-plate" />
            </div>

            {blown ? (
              <>
                <p className="cake-message">
                  YOUR WISHES ARE ON THEIR WAY ✨
                </p>

                <button
                  className="pixel-button"
                  onClick={() => setStage(3)}
                >
                  OPEN YOUR GIFT →
                </button>
              </>
            ) : (
              <button
                className="pixel-button"
                onClick={blowCandles}
              >
                BLOW THE CANDLES ✦
              </button>
            )}
          </section>
        )}

        {/* =================================
            STAGE 3 — GIFT AND LETTER
        ================================= */}

        {stage === 3 && (
          <section className="gift-stage">
            {!giftOpen ? (
              <>
                <p className="eyebrow">A LITTLE SOMETHING FOR YOU</p>

                <h1 className="stage-title">
                  One Last <span>Surprise</span>
                </h1>

                <button
                  className="gift-button"
                  onClick={openGift}
                  aria-label="Open birthday gift"
                >
                  <div className="gift-box">
                    <div className="gift-lid">
                      <span />
                    </div>
                    <div className="gift-body">
                      <span className="gift-ribbon" />
                    </div>
                    <div className="gift-bow">♡</div>
                  </div>
                </button>

                <p className="gift-hint">TAP TO OPEN YOUR GIFT</p>
              </>
            ) : (
              <div className="letter-card letter-enter">
                <span className="letter-heart">♡</span>

                <p className="eyebrow">A LETTER FOR YOU</p>

                <h1 className="letter-title">
                  Dear {sisterName},
                </h1>

                <div className="letter-content">
                  {birthdayLetter}
                </div>

                <p className="letter-signature">
                  Made with love ♡
                </p>

                <button
                  className="pixel-button"
                  onClick={() => setStage(4)}
                >
                  ONE MORE THING →
                </button>
              </div>
            )}
          </section>
        )}

        {/* =================================
            STAGE 4 — VOICE NOTE
        ================================= */}

        {stage === 4 && (
          <section className="voice-stage">
            <p className="eyebrow">SOMETHING FROM MY HEART</p>

            <h1 className="stage-title">
              A Message <span>For You</span>
            </h1>

            <div className="cassette">
              <div className="cassette-label">
                <span>VOICE NOTE</span>
                <span>♥ {sisterName.toUpperCase()}</span>
              </div>

              <div className="cassette-reels">
                <div className="reel">
                  <div />
                </div>

                <div className="cassette-line" />

                <div className="reel">
                  <div />
                </div>
              </div>

              <div className="cassette-bottom">
                <span>PLAY MY MESSAGE</span>
                <span>♡</span>
              </div>
            </div>

            <audio
              ref={audioRef}
              src={voiceNote}
              onEnded={handleAudioEnd}
              onPause={() => setPlaying(false)}
              onPlay={() => setPlaying(true)}
              preload="metadata"
            />

            <button
              className="pixel-button audio-button"
              onClick={toggleAudio}
            >
              {playing ? "Ⅱ PAUSE MESSAGE" : "▶ PLAY MESSAGE"}
            </button>

            <p className="voice-caption">
              A little piece of my heart, just for you.
            </p>

            <button
              className="restart-button"
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.pause();
                  audioRef.current.currentTime = 0;
                }

                setPlaying(false);
                setStage(0);
                setPhotoIndex(0);
                setBlown(false);
                setGiftOpen(false);
              }}
            >
              ↻ EXPERIENCE AGAIN
            </button>
          </section>
        )}

      </div>

      <footer className="footer">
        MADE BY UN ANNANN ♡
      </footer>
    </main>
  );
}

export default App;
