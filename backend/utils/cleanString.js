function cleanString(str) {
    if (!str) return null;
    
    const cleanedString = str.replace(/<[^>]*>/g, '');  
    return cleanedString.replace(/\\/g, '\\\\')    
                        .replace(/"/g, '\\"')      
                        .replace(/\r\n/g, ' ')     
                        .replace(/\n/g, ' ')       
                        .replace(/\r/g, ' ');      
}

module.exports = cleanString;