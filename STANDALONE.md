# Body Momentum - Standalone Version

A single-file workout tracker that works completely offline with no dependencies!

## Quick Start

**Simply open `index.html` in your browser - that's it!**

No installation, no build process, no npm, no Node.js required.

## Features

✅ **Complete Workout Tracking**
- Start workouts and add exercises
- Track sets with weight and reps
- Mark sets as completed
- Built-in rest timer

✅ **Exercise Library**
- 24+ pre-built exercises
- Filter by muscle group
- Search functionality

✅ **Progress Tracking**
- Workout history with calendar
- Personal records (PRs)
- Volume charts
- Statistics dashboard

✅ **Data Management**
- All data stored locally in browser
- Export workouts to CSV
- Dark mode support
- No account needed

✅ **Progressive Web App**
- Install on mobile devices
- Works offline
- No internet required

## How to Use

### Desktop
1. Download `index.html`
2. Double-click to open in your browser
3. Start tracking workouts!

### Mobile
1. Open `index.html` in your mobile browser
2. Add to home screen for app-like experience
3. Use like a native app

### Hosting
Upload `index.html` to any web host:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

## Browser Support

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## Data Storage

- All data stored in browser's localStorage
- No server or database needed
- Data persists between sessions
- Export to CSV for backup

## Privacy

- 100% offline - no data sent to servers
- No tracking or analytics
- No ads
- Your data stays on your device

## File Size

- Single HTML file: ~35KB
- No external dependencies
- No images or assets needed
- Loads instantly

## Customization

The file is self-contained and easy to modify:
- All CSS in `<style>` tags
- All JavaScript in `<script>` tags
- Add your own exercises to `DEFAULT_EXERCISES` array
- Customize colors in CSS `:root` variables

## Backup Your Data

**Important:** Since data is stored in browser storage:
1. Export your data regularly (Settings → Export Data)
2. Save the CSV file as backup
3. Clearing browser data will delete workouts

## Features Not Included

This standalone version does not include:
- Cloud sync (data stays local)
- Multi-device sync
- User accounts
- Social features

## Comparison: Standalone vs Full Version

| Feature | Standalone | Next.js Version |
|---------|-----------|-----------------|
| Installation | None | npm install |
| Build Process | None | Required |
| File Count | 1 | 25+ |
| Dependencies | 0 | 15+ packages |
| Performance | Instant | Fast |
| Deployment | Drop anywhere | Needs Node.js host |

## Tips

1. **Bookmark the page** for quick access
2. **Add to home screen** on mobile for app icon
3. **Export data monthly** as backup
4. **Use dark mode** to save battery on mobile
5. **Use rest timer** between sets for consistency

## Advanced Usage

### Adding Custom Exercises

Edit the `DEFAULT_EXERCISES` array in the JavaScript:

```javascript
DEFAULT_EXERCISES.push({
    id: 'my-exercise',
    name: 'My Custom Exercise',
    muscleGroup: 'chest',
    equipment: 'Dumbbells'
});
```

### Changing Theme Colors

Modify CSS variables in `:root`:

```css
:root {
    --blue-600: #your-color;
    --green-600: #your-color;
}
```

### Importing Old Data

If you exported data before, you'll need to manually import it by modifying localStorage or re-entering workouts.

## Troubleshooting

**Data disappeared?**
- Check if browser cleared storage
- Look for CSV exports as backups

**Page not loading?**
- Ensure JavaScript is enabled
- Try different browser
- Check browser console for errors

**Can't export data?**
- Some browsers block downloads
- Try allowing downloads for this page

## License

Free to use and modify for personal use.

## Credits

Inspired by Strong Workout Tracker
Built with vanilla HTML, CSS, and JavaScript
