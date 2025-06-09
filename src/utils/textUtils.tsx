export function processTextWithBold(text: string): JSX.Element {
  // Buscar texto entre ** y reemplazarlo con elementos bold
  const parts = text.split(/(\*\*.*?\*\*)/g);
  
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          // Remover los asteriscos y hacer bold
          const boldText = part.slice(2, -2);
          return <strong key={index} className="font-semibold">{boldText}</strong>;
        }
        return part;
      })}
    </>
  );
}
