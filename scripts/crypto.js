// Simple encryption utility for paid content
// Note: This is basic obfuscation, not military-grade encryption
// For production use, consider using proper encryption libraries

const ENCRYPTION_KEY = 'yiming.weng';

/**
 * Encrypt content using XOR cipher with Base64 encoding
 * @param {string} content - The plain text content
 * @returns {string} - Encrypted content
 */
export function encrypt(content) {
  // Convert to Base64 first
  const base64 = Buffer.from(content, 'utf-8').toString('base64');

  // XOR with key
  let encrypted = '';
  for (let i = 0; i < base64.length; i++) {
    const keyChar = ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
    const charCode = base64.charCodeAt(i) ^ keyChar;
    encrypted += String.fromCharCode(charCode);
  }

  // Convert to Base64 again for safe JSON encoding
  return Buffer.from(encrypted, 'binary').toString('base64');
}

/**
 * Decrypt content
 * @param {string} encryptedContent - The encrypted content
 * @returns {string} - Decrypted plain text
 */
export function decrypt(encryptedContent) {
  try {
    // Decode from Base64
    const binary = Buffer.from(encryptedContent, 'base64').toString('binary');

    // XOR with key (same operation as encryption)
    let decrypted = '';
    for (let i = 0; i < binary.length; i++) {
      const keyChar = ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
      const charCode = binary.charCodeAt(i) ^ keyChar;
      decrypted += String.fromCharCode(charCode);
    }

    // Decode from Base64
    return Buffer.from(decrypted, 'base64').toString('utf-8');
  } catch (error) {
    console.error('Decryption failed:', error);
    return '';
  }
}
