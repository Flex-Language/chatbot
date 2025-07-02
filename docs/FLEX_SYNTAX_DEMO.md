# Flex Language Syntax Highlighting Demo

This file demonstrates how the enhanced Flex Chatbot renders and highlights Flex programming language code with bilingual Franco-Arabic support.

## Example 1: Basic Flex Program (Franco-Arabic)

```flex
// Fonction principale fi Flex
fonction bdaye() {
    kateb("Marhaba! Welcome to Flex");
    
    law (user_input != null) {
        esm nom = egra();
        kateb("Bonjour " + nom);
    } walla {
        kateb("Erreur: No input provided");
    }
    
    // Loop kol les nombres men 1 ila 10
    lamma (rakam i = 1; i <= 10; i++) {
        kateb("Rakam: " + i);
        
        iza (i % 2 == 0) {
            kateb("Zoj (Even)");
        } walla {
            kateb("Fard (Odd)");
        }
    }
    
    yerga3 0;
}
```

## Example 2: Mixed Franco-Arabic and English

```flex
// Advanced Flex example with mixed keywords
class UserManager {
    private esm[] users;
    public static rakam userCount = 0;
    
    fonction addUser(esm username, rakam age) {
        iza (username.length > 0 && age >= 18) {
            users.push({
                esm: username,
                age: age,
                active: true
            });
            userCount++;
            kateb("User added successfully");
            return true;
        } walla {
            throw new Error("Invalid user data");
        }
    }
    
    fonction getAllActiveUsers() {
        noss activeUsers = [];
        
        kol (user fi users) {
            law (user.active) {
                activeUsers.push(user);
            }
        }
        
        yerga3 activeUsers;
    }
}
```

## Example 3: Pure English Keywords

```flex
function calculateTotal(numbers) {
    if (numbers.length === 0) {
        return 0;
    }
    
    let total = 0;
    for (let num of numbers) {
        total += num;
    }
    
    return total;
}

class MathUtils {
    static function isPrime(number) {
        if (number <= 1) return false;
        if (number <= 3) return true;
        if (number % 2 === 0 || number % 3 === 0) return false;
        
        for (let i = 5; i * i <= number; i += 6) {
            if (number % i === 0 || number % (i + 2) === 0) {
                return false;
            }
        }
        
        return true;
    }
}
```

## Color-Coded Syntax Elements

When displayed in the Flex Chatbot, the code above will be highlighted with the following color scheme:

### Franco-Arabic Keywords (Red - #ff6b6b)
- `fonction`, `fi`, `law`, `walla`, `lamma`, `kol`, `men`, `ila`, `iza`, `yerga3`
- `bdaye`, `nehaye`, `esm`, `rakam`, `noss`, `kateb`, `egra`

### English Keywords (Teal - #4ecdc4)  
- `function`, `if`, `else`, `while`, `for`, `class`, `return`, `import`, `export`
- `const`, `let`, `var`, `static`, `public`, `private`, `protected`

### Other Elements
- **Strings** (Mint Green - #95e1d3): `"Marhaba! Welcome to Flex"`
- **Numbers** (Yellow - #fce38a): `1`, `10`, `18`, `0`
- **Comments** (Gray - #888): `// Fonction principale fi Flex`
- **Operators** (Coral - #ff8a80): `+`, `==`, `!=`, `<=`, `>=`, `&&`, `||`
- **Functions** (Green - #81c784): `addUser`, `getAllActiveUsers`, `calculateTotal`
- **Variables** (Blue - #90caf9): `username`, `age`, `users`, `total`

## Interactive Features

The enhanced chatbot also includes:

1. **Copy Button**: Click 📋 to copy any code block
2. **Language Badge**: "Flex (Franco-Arabic)" indicator
3. **Responsive Design**: Code adapts to screen size
4. **Syntax Validation**: Real-time highlighting
5. **Mixed Language Support**: Seamless Franco-Arabic + English

## Usage in Chat

Simply paste any Flex code in the chatbot and it will automatically:
- Detect Flex language patterns
- Apply appropriate syntax highlighting
- Add copy functionality
- Display with proper formatting
- Support both language variants

This makes the Flex Chatbot the perfect companion for Franco-Arabic programming development! 