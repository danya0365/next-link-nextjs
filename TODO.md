# TODO - Next Link Social Media Platform

## 📋 Phase 1: Foundation Setup (Priority: HIGH)

### 1.1 Project Configuration ✅

- [x] Initialize Next.js 15 project
- [x] Setup package.json with dependencies
- [x] Configure Tailwind CSS v4
- [x] Setup TypeScript configuration
- [x] Create tailwind cn utility helper ✅
- [x] Update environment variables (.env.local)

### 1.2 Supabase Setup

- [x] Initialize Supabase project
- [x] Copy and configure migrations from reference project
- [x] Copy and configure seed data
- [x] Generate TypeScript types from Supabase schema
- [x] Test database connection

### 1.3 Core Infrastructure ✅

- [x] Update root layout.tsx metadata for Next Link ✅
- [x] Create MainLayout component with: ✅
  - [x] Header with navigation ✅
  - [x] Footer with links ✅
  - [x] Theme Toggle (Light/Dark mode) ✅
  - [x] Responsive design ✅
- [x] Setup Zustand stores structure ✅
- [x] Create auth store for authentication state ✅
- [x] Setup ThemeProvider (already exists, verify) ✅

### 1.4 Utilities & Helpers ✅

- [x] Create cn() utility for className merging ✅
- [x] Setup date formatting helpers ✅
- [x] Create text truncation utilities ✅
- [x] Setup image optimization helpers ✅
- [x] Create error handling utilities ✅
- [x] Create validation helpers ✅

### 1.5 Assets & Branding

- [x] Copy public assets from reference project
- [x] Generate Next Link logo
- [x] Create favicon set (16x16, 32x32, apple-touch-icon)
- [x] Create og-image for social sharing
- [x] Setup site.webmanifest

---

## 📱 Phase 2: Landing Page & Authentication (Priority: HIGH)

### 2.1 Landing Page ✅

- [x] Create landing page with sections: ✅
  - [x] Hero section with CTA ✅
  - [x] Features showcase ✅
  - [x] How it works section ✅
  - [x] Testimonials (mock data) ✅
  - [x] Statistics/Social proof ✅
  - [x] Call to action section ✅
- [x] Create master data for landing page ✅
- [x] Create mock data for demonstrations ✅
- [x] Implement responsive design ✅
- [x] Add animations and transitions ✅
- [x] Follow CREATE_PAGE_PATTERN.md (LandingPresenter, useLandingPresenter) ✅

### 2.2 Authentication Pages ✅

- [x] Create login page with: ✅
  - [x] Email/Password login ✅
  - [x] Social login buttons (UI only for now) ✅
  - [x] Remember me functionality ✅
  - [x] Forgot password link ✅
- [x] Create register page with: ✅
  - [x] User registration form ✅
  - [x] Email verification flow ✅
  - [x] Terms and conditions ✅
- [ ] Create forgot password page
- [ ] Create reset password page
- [x] Implement auth Zustand store with: ✅
  - [x] Login action ✅
  - [x] Logout action ✅
  - [x] Register action ✅
  - [x] Session persistence ✅
  - [x] User state management ✅
- [x] Follow CREATE_PAGE_PATTERN.md (AuthPresenter) ✅

---

## 👤 Phase 3: User Profile & Settings (Priority: HIGH)

### 3.1 Profile Pages ✅

- [x] Create user profile page following CREATE_PAGE_PATTERN.md: ✅
  - [x] ProfilePresenter.ts (business logic) ✅
  - [x] useProfilePresenter.ts (state management hook) ✅
  - [x] ProfileView.tsx (UI component) ✅
  - [x] app/profile/[userId]/page.tsx (server component) ✅
- [x] Profile sections: ✅
  - [x] Cover photo and avatar ✅
  - [x] Bio and basic information ✅
  - [x] Posts timeline ✅
  - [x] Photos grid ✅
  - [x] Friends list ✅
  - [x] About section ✅

### 3.2 Profile Edit

- [ ] Create edit profile modal/page
- [ ] Form fields:
  - [ ] Display name
  - [ ] Bio/Description
  - [ ] Location
  - [ ] Website
  - [ ] Birthday
  - [ ] Relationship status
- [ ] Avatar upload functionality
- [ ] Cover photo upload functionality
- [ ] Form validation with Zod

### 3.3 Settings ✅

- [x] Create settings page with tabs: ✅
  - [x] General settings ✅
  - [x] Privacy settings ✅
  - [x] Notification preferences ✅
  - [x] Security settings ✅
  - [x] Account management ✅
- [x] Follow CREATE_PAGE_PATTERN.md (SettingsPresenter, useSettingsPresenter) ✅

---

## 📝 Phase 4: Core Social Features (Priority: HIGH)

### 4.1 News Feed / Timeline ✅

- [x] Create news feed page following CREATE_PAGE_PATTERN.md: ✅
  - [x] FeedPresenter.ts ✅
  - [x] useFeedPresenter.ts ✅
  - [x] FeedView.tsx ✅
  - [x] app/feed/page.tsx ✅
- [x] Post card component with: ✅
  - [x] Author info (avatar, name, timestamp) ✅
  - [x] Post content (text, images, videos) ✅
  - [x] Reactions (Like, Love, Haha, Wow, Sad, Angry) ✅
  - [x] Comment count ✅
  - [x] Share count ✅
  - [x] Action buttons (Like, Comment, Share) ✅
- [x] Create post composer: ✅
  - [x] Text input with rich text ✅
  - [x] Image upload (multiple) ✅
  - [x] Video upload ✅
  - [x] Feeling/Activity selector ✅
  - [x] Privacy selector (Public, Friends, Only Me) ✅
  - [x] Location tagging ✅
  - [x] Tag friends ✅
- [ ] Infinite scroll implementation
- [ ] Pull to refresh
- [ ] Post filtering (All, Friends, Pages, Groups)

### 4.2 Posts Management

- [ ] Create post detail page
- [ ] Edit post functionality
- [ ] Delete post functionality
- [ ] Pin post to profile
- [ ] Archive post
- [ ] Report post
- [ ] Hide post from feed
- [ ] Save post for later

### 4.3 Reactions System

- [ ] Create reactions Zustand store
- [ ] Implement reaction picker component
- [ ] Show reaction summary
- [ ] Reaction animation
- [ ] Real-time reaction updates (mock)

### 4.4 Comments System

- [ ] Create comments section component
- [ ] Comment input with:
  - [ ] Text input
  - [ ] Image attachment
  - [ ] GIF picker (mock)
  - [ ] Emoji picker
- [ ] Comment card with:
  - [ ] Author info
  - [ ] Comment content
  - [ ] Timestamp
  - [ ] Like button
  - [ ] Reply button
  - [ ] Edit/Delete options
- [ ] Nested replies (2-3 levels)
- [ ] Comment reactions
- [ ] Load more comments
- [ ] Sort comments (Top, Newest, Oldest)

---

## 👥 Phase 5: Friends & Social Graph (Priority: MEDIUM)

### 5.1 Friends Management ✅

- [x] Create friends page following CREATE_PAGE_PATTERN.md: ✅
  - [x] FriendsPresenter.ts ✅
  - [x] useFriendsPresenter.ts ✅
  - [x] FriendsView.tsx ✅
  - [x] app/friends/page.tsx ✅
- [x] Friends tabs: ✅
  - [x] All friends ✅
  - [x] Friend requests (received) ✅
  - [ ] Friend requests (sent)
  - [x] Suggestions ✅
  - [ ] Birthdays
- [x] Friend card component ✅
- [x] Send friend request ✅
- [x] Accept/Decline friend request ✅
- [x] Unfriend functionality ✅
- [ ] Block user

### 5.2 People Discovery

- [ ] Create people search page
- [ ] Search filters:
  - [ ] Name
  - [ ] Location
  - [ ] Education
  - [ ] Workplace
  - [ ] Mutual friends
- [ ] Friend suggestions algorithm (mock)
- [ ] People you may know section

---

## 💬 Phase 6: Messaging System (Priority: MEDIUM)

### 6.1 Messenger Interface ✅

- [x] Create messenger page following CREATE_PAGE_PATTERN.md: ✅
  - [x] MessagesPresenter.ts ✅
  - [x] useMessagesPresenter.ts ✅
  - [x] MessagesView.tsx ✅
  - [x] app/messages/page.tsx ✅
- [x] Conversations list with: ✅
  - [x] User avatar ✅
  - [x] Last message preview ✅
  - [x] Unread indicator ✅
  - [x] Timestamp ✅
  - [x] Online status ✅
- [ ] Chat interface with:
  - [ ] Message bubbles
  - [ ] Timestamp
  - [ ] Read receipts
  - [ ] Typing indicator
- [ ] Message input with:
  - [ ] Text input
  - [ ] Image attachment
  - [ ] File attachment
  - [ ] GIF picker
  - [ ] Emoji picker
  - [ ] Stickers

### 6.2 Messaging Features

- [ ] Create new conversation
- [ ] Group chat creation
- [ ] Message search
- [ ] Delete message
- [ ] Edit message
- [ ] Forward message
- [ ] React to message
- [ ] Voice messages (UI only)
- [ ] Video call button (UI only)

---

## 🔔 Phase 7: Notifications (Priority: MEDIUM)

### 7.1 Notification System ✅

- [x] Create notifications page following CREATE_PAGE_PATTERN.md: ✅
  - [x] NotificationsPresenter.ts ✅
  - [x] useNotificationsPresenter.ts ✅
  - [x] NotificationsView.tsx ✅
  - [x] app/notifications/page.tsx ✅
- [x] Notification types: ✅
  - [x] Friend request ✅
  - [x] Post reaction ✅
  - [x] Comment on post ✅
  - [x] Reply to comment ✅
  - [x] Mention in post ✅
  - [x] Mention in comment ✅
  - [x] Share post ✅
  - [ ] Birthday reminder
  - [ ] Event invitation
  - [ ] Page like/follow
  - [ ] Group invitation
- [x] Notification card component ✅
- [x] Mark as read/unread ✅
- [ ] Delete notification
- [ ] Notification preferences
- [x] Real-time updates (mock with Zustand) ✅
- [x] NotificationStore with unread counts ✅

### 7.2 Notification Center

- [ ] Notification dropdown in header
- [ ] Unread count badge
- [ ] Quick actions from notifications
- [ ] See all notifications link

---

## 📸 Phase 8: Photos & Media (Priority: MEDIUM)

### 8.1 Photos Section

- [ ] Create photos page following CREATE_PAGE_PATTERN.md:
  - [ ] PhotosPresenter.ts
  - [ ] usePhotosPresenter.ts
  - [ ] PhotosView.tsx
  - [ ] app/photos/page.tsx
- [ ] Photo albums:
  - [ ] Create album
  - [ ] Edit album
  - [ ] Delete album
  - [ ] Album cover photo
  - [ ] Album privacy settings
- [ ] Photo viewer/lightbox:
  - [ ] Full-screen view
  - [ ] Navigation (prev/next)
  - [ ] Zoom in/out
  - [ ] Download option
  - [ ] Photo info
  - [ ] Comments on photo
  - [ ] Tag people in photo

### 8.2 Video Features

- [ ] Video upload
- [ ] Video player component
- [ ] Video controls (play, pause, volume, fullscreen)
- [ ] Video thumbnail generation
- [ ] Watch page for videos

---

## 📄 Phase 9: Pages (Priority: LOW)

### 9.1 Pages Management

- [ ] Create pages section following CREATE_PAGE_PATTERN.md:
  - [ ] PagesPresenter.ts
  - [ ] usePagesPresenter.ts
  - [ ] PagesView.tsx
  - [ ] app/pages/page.tsx
- [ ] Create page functionality:
  - [ ] Page name
  - [ ] Page category
  - [ ] Description
  - [ ] Profile picture
  - [ ] Cover photo
- [ ] Page types:
  - [ ] Business/Brand
  - [ ] Community
  - [ ] Public figure
  - [ ] Entertainment
- [ ] Page features:
  - [ ] Post as page
  - [ ] Like/Follow page
  - [ ] Page insights (mock stats)
  - [ ] Page settings
  - [ ] Page admins management

---

## 👥 Phase 10: Groups (Priority: LOW)

### 10.1 Groups Management

- [ ] Create groups section following CREATE_PAGE_PATTERN.md:
  - [ ] GroupsPresenter.ts
  - [ ] useGroupsPresenter.ts
  - [ ] GroupsView.tsx
  - [ ] app/groups/page.tsx
- [ ] Create group functionality:
  - [ ] Group name
  - [ ] Group description
  - [ ] Privacy (Public, Private, Secret)
  - [ ] Cover photo
- [ ] Group features:
  - [ ] Join/Leave group
  - [ ] Invite members
  - [ ] Member roles (Admin, Moderator, Member)
  - [ ] Post in group
  - [ ] Group rules
  - [ ] Group announcements
  - [ ] Member management

---

## 🎉 Phase 11: Events (Priority: LOW)

### 11.1 Events System

- [ ] Create events page following CREATE_PAGE_PATTERN.md:
  - [ ] EventsPresenter.ts
  - [ ] useEventsPresenter.ts
  - [ ] EventsView.tsx
  - [ ] app/events/page.tsx
- [ ] Create event functionality:
  - [ ] Event name
  - [ ] Event description
  - [ ] Date and time
  - [ ] Location (online/physical)
  - [ ] Cover photo
  - [ ] Privacy settings
- [ ] Event features:
  - [ ] RSVP (Going, Maybe, Can't Go)
  - [ ] Invite friends
  - [ ] Event discussion
  - [ ] Event photos
  - [ ] Event reminders

---

## 🔍 Phase 12: Search & Discovery (Priority: MEDIUM)

### 12.1 Global Search ✅

- [x] Create search page following CREATE_PAGE_PATTERN.md: ✅
  - [x] SearchPresenter.ts ✅
  - [x] useSearchPresenter.ts ✅
  - [x] SearchView.tsx ✅
  - [x] app/search/page.tsx ✅
- [x] Search categories: ✅
  - [x] Posts ✅
  - [x] People ✅
  - [ ] Photos
  - [ ] Videos
  - [ ] Pages
  - [ ] Groups
  - [ ] Events
- [ ] Search filters:
  - [ ] Date range
  - [ ] Location
  - [ ] Post type
  - [ ] From specific people
- [ ] Recent searches
- [ ] Trending topics

---

## 🎨 Phase 13: UI Components Library (Priority: HIGH)

### 13.1 Reusable Components

- [x] Button component (primary, secondary, outline, ghost)
- [x] Input component (text, email, password, textarea)
- [x] Modal component
- [ ] Dropdown component
- [ ] Tooltip component
- [x] Avatar component (with online status)
- [ ] Card component
- [x] Badge component
- [ ] Tabs component
- [ ] Accordion component
- [x] Toast/Alert component
- [ ] Loading spinner
- [x] Skeleton loader
- [ ] Pagination component
- [ ] Infinite scroll component

### 13.2 Form Components

- [ ] Form wrapper with react-hook-form
- [ ] Form field wrapper
- [ ] Error message display
- [ ] File upload component
- [ ] Image cropper component
- [ ] Rich text editor (simple)
- [ ] Emoji picker component
- [ ] Mention/Tag input component

---

## 📊 Phase 14: Mock Data & Stores (Priority: HIGH)

### 14.1 Zustand Stores

- [x] authStore (authentication state)
- [ ] userStore (current user data)
- [ ] postsStore (posts data and interactions)
- [ ] commentsStore (comments data)
- [ ] reactionsStore (reactions data)
- [ ] friendsStore (friends data)
- [ ] messagesStore (messages and conversations)
- [ ] notificationsStore (notifications data)
- [ ] photosStore (photos and albums)
- [ ] pagesStore (pages data)
- [ ] groupsStore (groups data)
- [ ] eventsStore (events data)
- [ ] searchStore (search history and results)

### 14.2 Mock Data Generation

- [ ] Users mock data (50-100 users)
- [ ] Posts mock data (200+ posts)
- [ ] Comments mock data
- [ ] Photos mock data
- [ ] Messages mock data
- [ ] Notifications mock data
- [ ] Friends connections mock data
- [ ] Pages mock data
- [ ] Groups mock data
- [ ] Events mock data

### 14.3 Master Data

- [ ] Countries list
- [ ] Cities list
- [ ] Reaction types
- [ ] Post privacy options
- [ ] Relationship statuses
- [ ] Page categories
- [ ] Group categories
- [ ] Event categories

---

## 🎯 Phase 15: Advanced Features (Priority: LOW)

### 15.1 Stories (Like Instagram/Facebook Stories)

- [ ] Create story
- [ ] View stories
- [ ] Story viewer with timer
- [ ] Story reactions
- [ ] Story replies

### 15.2 Marketplace

- [ ] List item for sale
- [ ] Browse marketplace
- [ ] Item categories
- [ ] Search and filters
- [ ] Message seller

### 15.3 Watch (Video Platform)

- [ ] Video feed
- [ ] Video categories
- [ ] Recommended videos
- [ ] Watch history
- [ ] Create playlist

### 15.4 Gaming

- [ ] Games directory
- [ ] Game leaderboards
- [ ] Gaming friends
- [ ] Game invitations

---

## 🔒 Phase 16: Privacy & Security (Priority: MEDIUM)

### 16.1 Privacy Controls

- [ ] Post privacy settings
- [ ] Profile privacy settings
- [ ] Who can see friends list
- [ ] Who can send friend requests
- [ ] Who can look you up
- [ ] Blocked users list
- [ ] Activity log

### 16.2 Security Features

- [ ] Two-factor authentication (UI)
- [ ] Login alerts
- [ ] Active sessions management
- [ ] Password change
- [ ] Account recovery options

---

## 📱 Phase 17: Responsive Design & PWA (Priority: MEDIUM)

### 17.1 Mobile Optimization

- [ ] Mobile navigation menu
- [ ] Touch-friendly interactions
- [ ] Mobile-optimized layouts
- [ ] Gesture support (swipe, pull-to-refresh)

### 17.2 PWA Features

- [ ] Service worker setup
- [ ] Offline support
- [ ] Install prompt
- [ ] Push notifications (UI)
- [ ] App-like experience

---

## ♿ Phase 18: Accessibility & Performance (Priority: MEDIUM)

### 18.1 Accessibility

- [ ] Semantic HTML
- [ ] ARIA labels
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] Focus indicators
- [ ] Color contrast compliance

### 18.2 Performance Optimization

- [ ] Image optimization (Next.js Image)
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Caching strategy
- [ ] Bundle size optimization
- [ ] Lighthouse score optimization

---

## 🧪 Phase 19: Testing (Priority: LOW)

### 19.1 Unit Tests

- [ ] Component tests
- [ ] Store tests
- [ ] Utility function tests

### 19.2 Integration Tests

- [ ] User flow tests
- [ ] API integration tests

---

## 📚 Phase 20: Documentation (Priority: LOW)

### 20.1 Code Documentation

- [ ] Component documentation
- [ ] Store documentation
- [ ] API documentation
- [ ] Setup guide

### 20.2 User Documentation

- [ ] User guide
- [ ] Feature documentation
- [ ] FAQ section

---

## 🚀 Deployment & DevOps (Priority: LOW)

- [ ] Setup Vercel deployment
- [ ] Configure environment variables
- [ ] Setup CI/CD pipeline
- [ ] Performance monitoring
- [ ] Error tracking

---

## 📝 Notes

- All pages must follow the pattern in `/Users/marosdeeuma/work-pulse-nextjs/prompt/CREATE_PAGE_PATTERN.md`
- Use Zustand for client-side state management
- Use mock data initially before implementing real backend
- Focus on UI/UX first, then add real functionality
- Follow Clean Architecture principles
- Implement dark mode for all components
- Use TypeScript for type safety
- Follow Thai language localization where appropriate
