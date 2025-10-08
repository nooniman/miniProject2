# Testing Guide - Fitness Tracker Hub

## 🧪 How to Test All Features

### 1. Test Responsiveness

#### Desktop (1200px+)
1. Open browser DevTools (F12)
2. Set viewport to 1440px width
3. Navigate through all pages - should see 3-column layouts

#### Tablet (768px - 1024px)
1. Set viewport to 768px or 1024px
2. Check that navigation wraps properly
3. Verify 2-column grids work

#### Mobile (480px - 768px)
1. Set viewport to 375px (iPhone) or 414px (large phone)
2. Test all pages - everything should stack vertically
3. Check that buttons are full-width
4. Verify navigation is centered and stacked

#### Small Mobile (< 480px)
1. Set viewport to 320px (small phone)
2. Ensure all content is readable
3. Check that nothing overflows

### 2. Test Button Visibility

#### Check All Button Types:
- ✅ **Primary Buttons** (Browse Workouts, Save Settings, etc.)
  - Should have purple background with white text
  - Hover should darken slightly
  
- ✅ **Secondary Buttons** (Cardio Workouts, Cancel, etc.)
  - Should have gray background with white text
  - Visible on all backgrounds
  
- ✅ **Outline Buttons** (Reset to Defaults)
  - White background with purple border and text
  - Should invert colors on hover

#### Pages to Check:
- Home page: All CTA buttons
- Workout List: Filter buttons
- Workout Detail: Action buttons
- Workout Logs: Add Log, Delete buttons
- Settings: Save, Reset, Cancel buttons

### 3. Test Settings Functionality

#### Step-by-Step Test:
1. **Go to Settings page** (`/settings`)
2. **Change User Name**
   - Type a new name
   - Click "Save Settings"
   - Refresh page - name should persist
3. **Change Theme**
   - Select "Dark" from dropdown
   - Save settings
   - Check that document theme attribute changes
4. **Toggle Notifications**
   - Click checkbox to disable
   - Save settings
   - Refresh - should still be disabled
5. **Change Weekly Goal**
   - Enter 200 minutes
   - Save settings
   - Check summary shows 200 min
6. **Reset to Defaults**
   - Click "Reset to Defaults"
   - All values should return to original
   - LocalStorage should clear

### 4. Test Feature Cards (Home Page)

#### What to Check:
1. Go to Home page (`/`)
2. Hover over "Track Workouts" card
3. ✅ **Should NOT move or transform**
4. ✅ **Should NOT change shadow**
5. ✅ **Should remain static**
6. Repeat for "View Logs" and "Set Goals" cards

### 5. Test Dynamic Data

#### Test Stats on Home Page:
1. Go to Home page
2. Note the workout count, calories, and minutes
3. These should match the actual workout data
4. Add a new log (see next test)
5. Return to home - stats should update

#### Test Add Workout Log:
1. **Navigate to any workout** (e.g., `/workouts/1`)
2. **Click "View All Logs"** or **"Start Workout"**
3. **Click "➕ Add New Log"** button
4. **Fill out the form:**
   - Select a day (e.g., Monday)
   - Add notes: "Completed 3 sets of 10 reps, felt great!"
5. **Click "Save Log"**
6. ✅ New log should appear in the list
7. ✅ Form should close automatically
8. Refresh the page - log should still be there

#### Test Delete Workout Log:
1. On the workout logs page
2. Click **"Delete Log"** on any log
3. ✅ Should show confirmation dialog
4. Click OK
5. ✅ Log should disappear immediately
6. Refresh page - log should stay deleted

#### Test Filter Logs by Day:
1. On workout logs page with multiple logs
2. Click different day buttons (Monday, Tuesday, etc.)
3. ✅ URL should update with `?day=monday`
4. ✅ Only logs for that day should show
5. Click "All Days"
6. ✅ Should show all logs again

### 6. Test Data Persistence

#### LocalStorage Test:
1. **Add a new log** to any workout
2. **Change settings** (name, theme, goal)
3. **Close the browser tab completely**
4. **Reopen** http://localhost:5173
5. ✅ All data should still be there:
   - Your log should exist
   - Settings should be unchanged
   - Stats should be accurate

#### Test Reset:
1. Go to Settings
2. Click "Reset to Defaults"
3. All settings return to original values
4. Go to any workout logs page
5. Your added logs are still there (only settings reset)

### 7. Test All Routes

#### Navigation Test:
1. **Home** (`/`) - Should show welcome message and stats
2. **Workouts** (`/workouts`) - Should show all 8 workouts
3. **Search** (`/workouts?q=run`) - Should filter to "Morning Run"
4. **Filter** (`/workouts?type=cardio`) - Should show only cardio
5. **Combined** (`/workouts?q=leg&type=strength`) - Should show "Leg Day"
6. **Detail** (`/workouts/1`) - Should show Morning Run details
7. **Logs** (`/workouts/1/logs`) - Should show workout logs
8. **Logs Filtered** (`/workouts/1/logs?day=monday`) - Should filter
9. **Settings** (`/settings`) - Should show settings page
10. **404** (`/invalid-page`) - Should show 404 page

### 8. Test Query Param Preservation

1. Go to `/workouts?q=cardio&type=cardio`
2. Click on any workout card
3. On detail page, click "← Back to Workouts"
4. ✅ Should return to `/workouts?q=cardio&type=cardio`
5. ✅ Search box should still show "cardio"
6. ✅ "Cardio" filter button should be active

### 9. Test Programmatic Navigation

1. Go to any workout detail page (e.g., `/workouts/1`)
2. Click **"🎯 Start Workout"** button
3. ✅ Should navigate to `/workouts/1/logs`
4. ✅ Should show welcome banner "Ready to start tracking..."
5. ✅ Navigation should happen without page reload

### 10. Cross-Browser Testing

#### Test in Multiple Browsers:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (if on Mac)

#### What to Check:
- Layout renders correctly
- Buttons are visible and clickable
- Forms submit properly
- LocalStorage works
- Responsive breakpoints trigger correctly

## 📱 Mobile Device Testing

### Real Device Test (if available):
1. Get your phone's IP on same network
2. Run: `npm run dev -- --host`
3. Visit `http://[your-ip]:5173` on phone
4. Test all features on real touchscreen

### DevTools Mobile Emulation:
1. Open DevTools (F12)
2. Click device toolbar icon (Ctrl+Shift+M)
3. Select "iPhone 12 Pro" or "Galaxy S20"
4. Test touch interactions
5. Test vertical scrolling
6. Test form inputs with on-screen keyboard

## ✅ Success Criteria

All tests should pass with:
- ✅ No layout breaking on any screen size
- ✅ All text clearly visible
- ✅ All buttons clearly visible and clickable
- ✅ Settings save and persist
- ✅ Feature cards are static (no hover transform)
- ✅ Logs can be added and deleted
- ✅ Data persists across page reloads
- ✅ All routes work correctly
- ✅ Query params preserve state
- ✅ Programmatic navigation works
- ✅ No console errors

## 🐛 Common Issues to Check

1. **Text invisible?** Check contrast in DevTools Lighthouse
2. **Layout broken?** Check CSS grid/flexbox in DevTools
3. **Data not persisting?** Check localStorage in Application tab
4. **Form not submitting?** Check console for errors
5. **Buttons not visible?** Inspect button CSS for background color

## 📊 Performance Check

1. Open Lighthouse in DevTools
2. Run audit for:
   - Performance: Should be 90+
   - Accessibility: Should be 90+
   - Best Practices: Should be 90+
3. Fix any issues if scores are low

---

**Happy Testing! 🎉**
