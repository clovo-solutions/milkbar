import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.div
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                border: '3px solid rgba(255,255,255,0.2)',
                borderTopColor: '#fff',
                animation: 'milkbar-spin 0.8s linear infinite',
              }}
            />
          </motion.div>
          <style>{`@keyframes milkbar-spin { to { transform: rotate(360deg); } }`}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
