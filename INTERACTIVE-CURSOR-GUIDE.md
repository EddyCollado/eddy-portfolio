# Interactive Cursor Effects - Technical Guide

## What We Built
A mouse-following gradient effect that creates an interactive glow around your cursor in the Hero section.

---

## How It Works (Step by Step)

### 1. **Tracking Mouse Position**

```javascript
const mouseX = useMotionValue(0);
const mouseY = useMotionValue(0);
```

**What is `useMotionValue`?**
- Creates a reactive value that Framer Motion can animate
- Updates WITHOUT causing React re-renders (super performant!)
- Think of it as a "live variable" that animations can watch

**Why not `useState`?**
- `useState` would re-render the entire component on every mouse move (60+ times per second!)
- `useMotionValue` updates silently in the background, only affecting animations

---

### 2. **Adding Smooth Physics**

```javascript
const springConfig = { damping: 25, stiffness: 150 };
const mouseXSpring = useSpring(mouseX, springConfig);
const mouseYSpring = useSpring(mouseY, springConfig);
```

**What is `useSpring`?**
- Adds physics-based smoothing to values
- Makes the cursor follow feel natural, not robotic
- Like adding "weight" to the movement

**Spring Config Explained:**
- `damping: 25` - How much resistance (higher = slower to stop)
- `stiffness: 150` - How quickly it responds (higher = snappier)

**Try adjusting these values:**
- `damping: 10, stiffness: 300` = Very snappy, quick response
- `damping: 50, stiffness: 50` = Slow, floaty, dreamy
- `damping: 25, stiffness: 150` = Balanced (current setting)

---

### 3. **Listening to Mouse Movement**

```javascript
useEffect(() => {
  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);  // X position from left edge
    mouseY.set(e.clientY);  // Y position from top edge
  };
  
  window.addEventListener('mousemove', handleMouseMove);
  return () => window.removeEventListener('mousemove', handleMouseMove);
}, [mouseX, mouseY]);
```

**What's happening:**
1. `useEffect` runs once when component mounts
2. Adds a listener for mouse movement across the entire window
3. Updates `mouseX` and `mouseY` with cursor position
4. Cleanup function removes listener when component unmounts (prevents memory leaks)

---

### 4. **Creating the Interactive Glow**

```javascript
<motion.div
  className="absolute inset-0 pointer-events-none"
  style={{
    background: `radial-gradient(600px circle at ${mouseXSpring}px ${mouseYSpring}px, rgba(44, 152, 240, 0.15), transparent 80%)`,
  }}
/>
```

**Breaking it down:**
- `absolute inset-0` - Covers entire hero section
- `pointer-events-none` - Lets clicks pass through (important!)
- `radial-gradient` - Creates circular gradient
  - `600px circle` - Size of the glow
  - `at ${mouseXSpring}px ${mouseYSpring}px` - Position follows cursor
  - `rgba(44, 152, 240, 0.15)` - Primary blue at 15% opacity
  - `transparent 80%` - Fades to transparent at 80% of radius

---

## Future-Proofing: How to Extend This

### 1. **Add Multiple Cursor Effects**

```javascript
// Create multiple glows with different colors
<motion.div
  style={{
    background: `radial-gradient(400px at ${mouseXSpring}px ${mouseYSpring}px, 
                rgba(139, 92, 246, 0.1), transparent)`,
  }}
/>
<motion.div
  style={{
    background: `radial-gradient(800px at ${mouseXSpring}px ${mouseYSpring}px, 
                rgba(44, 152, 240, 0.05), transparent)`,
  }}
/>
```

### 2. **Add Parallax Effect (Different Speeds)**

```javascript
// Slower following effect
const slowX = useSpring(mouseX, { damping: 40, stiffness: 80 });
const slowY = useSpring(mouseY, { damping: 40, stiffness: 80 });

// Use slowX/slowY for background layer
// Use mouseXSpring/mouseYSpring for foreground layer
```

### 3. **Add Click Ripple Effect**

```javascript
const [ripples, setRipples] = useState([]);

const handleClick = (e) => {
  const newRipple = {
    x: e.clientX,
    y: e.clientY,
    id: Date.now(),
  };
  setRipples([...ripples, newRipple]);
  
  // Remove after animation
  setTimeout(() => {
    setRipples(prev => prev.filter(r => r.id !== newRipple.id));
  }, 1000);
};

// In JSX:
{ripples.map(ripple => (
  <motion.div
    key={ripple.id}
    initial={{ scale: 0, opacity: 1 }}
    animate={{ scale: 3, opacity: 0 }}
    transition={{ duration: 1 }}
    style={{
      position: 'absolute',
      left: ripple.x,
      top: ripple.y,
      width: 100,
      height: 100,
      borderRadius: '50%',
      border: '2px solid rgba(44, 152, 240, 0.5)',
    }}
  />
))}
```

### 4. **Add Particle Attraction to Cursor**

```javascript
// In particle animation, add cursor attraction
const distanceX = mouseXSpring.get() - particleX;
const distanceY = mouseYSpring.get() - particleY;
const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

if (distance < 200) {
  // Pull particle toward cursor
  particleX += distanceX * 0.01;
  particleY += distanceY * 0.01;
}
```

### 5. **Add Custom Cursor**

```javascript
<motion.div
  className="fixed w-8 h-8 border-2 border-primary rounded-full pointer-events-none z-50"
  style={{
    left: mouseXSpring,
    top: mouseYSpring,
    x: '-50%',
    y: '-50%',
  }}
/>

// Hide default cursor in CSS:
// body { cursor: none; }
```

---

## Performance Tips

1. **Use `useMotionValue` for frequently updating values** - No re-renders!
2. **Use `pointer-events-none`** - Prevents blocking clicks
3. **Limit gradient size** - Smaller = better performance
4. **Use `will-change: transform`** - Hints browser to optimize
5. **Throttle mouse events** - If needed for complex effects

---

## Common Patterns

### Pattern 1: Mouse Distance Effect
```javascript
const distance = useTransform(
  [mouseX, mouseY],
  ([x, y]) => Math.sqrt(x ** 2 + y ** 2)
);
```

### Pattern 2: Mouse Angle
```javascript
const angle = useTransform(
  [mouseX, mouseY],
  ([x, y]) => Math.atan2(y, x) * (180 / Math.PI)
);
```

### Pattern 3: Hover Detection
```javascript
const [isHovering, setIsHovering] = useState(false);

<div
  onMouseEnter={() => setIsHovering(true)}
  onMouseLeave={() => setIsHovering(false)}
>
  <motion.div
    animate={{ scale: isHovering ? 1.2 : 1 }}
  />
</div>
```

---

## Debugging Tips

1. **See the values:**
```javascript
useEffect(() => {
  console.log('Mouse:', mouseX.get(), mouseY.get());
}, []);
```

2. **Visualize the spring:**
```javascript
<div style={{ 
  position: 'fixed', 
  top: 10, 
  left: 10, 
  color: 'white' 
}}>
  X: {Math.round(mouseXSpring.get())} 
  Y: {Math.round(mouseYSpring.get())}
</div>
```

3. **Test without spring:**
```javascript
// Use mouseX/mouseY directly to see instant response
// Then add spring back to compare
```

---

## Resources for Learning More

- **Framer Motion Docs**: https://www.framer.com/motion/
- **useMotionValue**: https://www.framer.com/motion/use-motion-value/
- **useSpring**: https://www.framer.com/motion/use-spring/
- **useTransform**: https://www.framer.com/motion/use-transform/

---

## Your Current Implementation

✅ Mouse tracking with `useMotionValue`
✅ Smooth following with `useSpring`
✅ Radial gradient glow effect
✅ Performance optimized (no re-renders)
✅ Non-blocking (pointer-events-none)

**Next Level Ideas:**
- Add click ripples
- Create custom cursor
- Add particle attraction
- Multiple colored glows
- Parallax layers

Experiment and have fun! 🚀
