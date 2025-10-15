# TODO - Next Link Social Media Platform

## 📋 Phase 1: Foundation Setup (Priority: HIGH)

### 1.1 Project Configuration ✅
- [x] Initialize Next.js 15 project
- [x] Setup package.json with dependencies
- [x] Configure Tailwind CSS v4
- [x] Setup TypeScript configuration
- [ ] Create tailwind cn utility helper
- [ ] Update environment variables (.env.local)

### 1.2 Supabase Setup
- [ ] Initialize Supabase project
- [ ] Copy and configure migrations from reference project
- [ ] Copy and configure seed data
- [ ] Generate TypeScript types from Supabase schema
- [ ] Test database connection

### 1.3 Core Infrastructure
- [ ] Update root layout.tsx metadata for Next Link
- [ ] Create MainLayout component with:
  - [ ] Header with navigation
  - [ ] Footer with links
  - [ ] Theme Toggle (Light/Dark mode)
  - [ ] Responsive design
- [ ] Setup Zustand stores structure
- [ ] Create auth store for authentication state
- [ ] Setup ThemeProvider (already exists, verify)

### 1.4 Utilities & Helpers
- [ ] Create cn() utility for className merging
- [ ] Setup date formatting helpers
- [ ] Create text truncation utilities
- [ ] Setup image optimization helpers
- [ ] Create error handling utilities

### 1.5 Assets & Branding
- [ ] Copy public assets from reference project
- [ ] Generate Next Link logo
- [ ] Create favicon set (16x16, 32x32, apple-touch-icon)
- [ ] Create og-image for social sharing
- [ ] Setup site.webmanifest

---

## 📱 Phase 2: Landing Page & Authentication (Priority: HIGH)

### 2.1 Landing Page
- [ ] Create landing page with sections:
  - [ ] Hero section with CTA
  - [ ] Features showcase
  - [ ] How it works section
  - [ ] Testimonials (mock data)
  - [ ] Statistics/Social proof
  - [ ] Call to action section
- [ ] Create master data for landing page
- [ ] Create mock data for demonstrations
- [ ] Implement responsive design
- [ ] Add animations and transitions

### 2.2 Authentication Pages
- [ ] Create login page with:
  - [ ] Email/Password login
  - [ ] Social login buttons (UI only for now)
  - [ ] Remember me functionality
  - [ ] Forgot password link
- [ ] Create register page with:
  - [ ] User registration form
  - [ ] Email verification flow
  - [ ] Terms and conditions
- [ ] Create forgot password page
- [ ] Create reset password page
- [ ] Implement auth Zustand store with:
  - [ ] Login action
  - [ ] Logout action
  - [ ] Register action
  - [ ] Session persistence
  - [ ] User state management

---

## 👤 Phase 3: User Profile & Settings (Priority: HIGH)

### 3.1 Profile Pages
- [ ] Create user profile page following CREATE_PAGE_PATTERN.md:
  - [ ] ProfilePresenter.ts (business logic)
  - [ ] useProfilePresenter.ts (state management hook)
  - [ ] ProfileView.tsx (UI component)
  - [ ] app/profile/[userId]/page.tsx (server component)
- [ ] Profile sections:
  - [ ] Cover photo and avatar
  - [ ] Bio and basic information
  - [ ] Posts timeline
  - [ ] Photos grid
  - [ ] Friends list
  - [ ] About section

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

### 3.3 Settings
- [ ] Create settings page with tabs:
  - [ ] General settings
  - [ ] Privacy settings
  - [ ] Notification preferences
  - [ ] Security settings
  - [ ] Account management

---

## 📝 Phase 4: Core Social Features (Priority: HIGH)

### 4.1 News Feed / Timeline
- [ ] Create news feed page following CREATE_PAGE_PATTERN.md:
  - [ ] NewsFeedPresenter.ts
  - [ ] useNewsFeedPresenter.ts
  - [ ] NewsFeedView.tsx
  - [ ] app/feed/page.tsx
- [ ] Post card component with:
  - [ ] Author info (avatar, name, timestamp)
  - [ ] Post content (text, images, videos)
  - [ ] Reactions (Like, Love, Haha, Wow, Sad, Angry)
  - [ ] Comment count
  - [ ] Share count
  - [ ] Action buttons (Like, Comment, Share)
- [ ] Create post composer:
  - [ ] Text input with rich text
  - [ ] Image upload (multiple)
  - [ ] Video upload
  - [ ] Feeling/Activity selector
  - [ ] Privacy selector (Public, Friends, Only Me)
  - [ ] Location tagging
  - [ ] Tag friends
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

### 5.1 Friends Management
- [ ] Create friends page following CREATE_PAGE_PATTERN.md:
  - [ ] FriendsPresenter.ts
  - [ ] useFriendsPresenter.ts
  - [ ] FriendsView.tsx
  - [ ] app/friends/page.tsx
- [ ] Friends tabs:
  - [ ] All friends
  - [ ] Friend requests (received)
  - [ ] Friend requests (sent)
  - [ ] Suggestions
  - [ ] Birthdays
- [ ] Friend card component
- [ ] Send friend request
- [ ] Accept/Decline friend request
- [ ] Unfriend functionality
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

### 6.1 Messenger Interface
- [ ] Create messenger page following CREATE_PAGE_PATTERN.md:
  - [ ] MessengerPresenter.ts
  - [ ] useMessengerPresenter.ts
  - [ ] MessengerView.tsx
  - [ ] app/messages/page.tsx
- [ ] Conversations list with:
  - [ ] User avatar
  - [ ] Last message preview
  - [ ] Unread indicator
  - [ ] Timestamp
  - [ ] Online status
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

### 7.1 Notification System
- [ ] Create notifications page following CREATE_PAGE_PATTERN.md:
  - [ ] NotificationsPresenter.ts
  - [ ] useNotificationsPresenter.ts
  - [ ] NotificationsView.tsx
  - [ ] app/notifications/page.tsx
- [ ] Notification types:
  - [ ] Friend request
  - [ ] Post reaction
  - [ ] Comment on post
  - [ ] Reply to comment
  - [ ] Mention in post
  - [ ] Mention in comment
  - [ ] Share post
  - [ ] Birthday reminder
  - [ ] Event invitation
  - [ ] Page like/follow
  - [ ] Group invitation
- [ ] Notification card component
- [ ] Mark as read/unread
- [ ] Delete notification
- [ ] Notification preferences
- [ ] Real-time updates (mock with Zustand)

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

### 12.1 Global Search
- [ ] Create search page following CREATE_PAGE_PATTERN.md:
  - [ ] SearchPresenter.ts
  - [ ] useSearchPresenter.ts
  - [ ] SearchView.tsx
  - [ ] app/search/page.tsx
- [ ] Search categories:
  - [ ] Posts
  - [ ] People
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
- [ ] Button component (primary, secondary, outline, ghost)
- [ ] Input component (text, email, password, textarea)
- [ ] Modal component
- [ ] Dropdown component
- [ ] Tooltip component
- [ ] Avatar component (with online status)
- [ ] Card component
- [ ] Badge component
- [ ] Tabs component
- [ ] Accordion component
- [ ] Toast/Alert component
- [ ] Loading spinner
- [ ] Skeleton loader
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
- [ ] authStore (authentication state)
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
