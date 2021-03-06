class GameNotes {
    constructor(noteInterval, musicDelay, key) {
        this.noteInterval = noteInterval;
        this.musicDelay = musicDelay;
        this.key = key;

        this.scoreEl = document.getElementsByClassName('score')[0];
        this.maxStreakEl = document.getElementsByClassName('max-streak')[0];
        this.streakEl = document.getElementsByClassName('streak')[0];

        this.score = 0;
        this.maxStreak = 0;
        this.streak = 0;
        this.multiplier = 1;
        this.hits = 0;
        this.misses = 0;
        this.totalNotes = 0;
        this.rockInput = 0;
    }

    setNoteCheck(songNote, time) {
        let timeDelay = 260 + this.musicDelay + time;

        setTimeout(
            () => this.checkNote(songNote),
            timeDelay
        );
    }

    checkNote(songNote) {
        if (this.key.isDown(this.key.pos[songNote.pos])) {
            if (this.streak === 30) {
                this.multiplier = 4;
            } else if (this.streak === 20) {
                this.multiplier = 3;
            } else if (this.streak === 10) {
                this.multiplier = 2;
            }
            this.score += 100 * Number(this.multiplier);
            this.hits += 1;
            this.streak += 1;
            if (this.rockInput < 20) {
                this.rockInput += 1;
            }
        } else {
            this.streak = 0;
            this.misses += 1;
            this.multiplier = 1;
            if (this.rockInput > -20) {
                this.rockInput -= 1;
            }
        }


        if (this.streak > this.maxStreak) {
            this.maxStreak = this.streak;
        }

        this.totalNotes += 1;

        this.scoreEl.innerHTML = `Score: ${this.score}`;
        this.maxStreakEl.innerHTML = `Max Streak: ${this.maxStreak}`;
    }
}

export default GameNotes;
