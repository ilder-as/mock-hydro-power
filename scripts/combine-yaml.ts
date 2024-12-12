import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

const componentsDir = './components';
const outputFile = './openapi.combined.yaml';

// Read the main OpenAPI file
const mainSpec = yaml.load(fs.readFileSync('./openapi.yaml', 'utf8')) as any;

// Initialize components object if it doesn't exist
if (!mainSpec.components) {
  mainSpec.components = {};
}
if (!mainSpec.components.schemas) {
  mainSpec.components.schemas = {};
}

// Function to update references
function updateRefs(obj: any) {
  if (typeof obj !== 'object' || obj === null) return;
  
  for (const key in obj) {
    if (key === '$ref' && typeof obj[key] === 'string') {
      // Update reference to use components schema
      const refPath = obj[key];
      console.log('Processing ref:', refPath);
      if (refPath.startsWith('./') || refPath.endsWith('.yaml')) {
        const componentName = path.basename(refPath, '.yaml');
        obj[key] = `#/components/schemas/${componentName}`;
      }
    } else {
      updateRefs(obj[key]);
    }
  }
}

// Read and process all component files
console.log('Reading component files from:', componentsDir);
const componentFiles = fs.readdirSync(componentsDir);
console.log('Found component files:', componentFiles);

componentFiles.forEach(file => {
  if (file.endsWith('.yaml')) {
    const componentName = path.basename(file, '.yaml');
    console.log('Processing component:', componentName);
    const componentContent = yaml.load(
      fs.readFileSync(path.join(componentsDir, file), 'utf8')
    );
    
    // Update references within the component
    updateRefs(componentContent);
    
    mainSpec.components.schemas[componentName] = componentContent;
  }
});

// Update all references in the main spec
updateRefs(mainSpec);

// Write the combined spec
fs.writeFileSync(outputFile, yaml.dump(mainSpec));
console.log('Combined OpenAPI specification written to', outputFile);
console.log('Available schemas:', Object.keys(mainSpec.components.schemas)); 