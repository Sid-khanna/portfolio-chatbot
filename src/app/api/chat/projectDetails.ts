type ProjectEntry = {
  aliases: string[];
  content: string;
};

export const projectDetails: ProjectEntry[] = [
  {
    aliases: ["ParSight", "golf drone", "golf ball tracker", "capstone project"],
    content: `<span class="font-bold text-purple-400">ParSight</span>: as part of our final-year engineering capstone, we developed ParSight, an autonomous drone system designed to assist senior golfers by tracking golf balls in real time and hovering over their final position to provide an enhanced visual reference. the project addresses a growing accessibility issue in recreational sports—specifically age-related vision decline—by offering a real-time robotic solution that enhances visibility without interfering with gameplay.

ParSight follows a Sense–Plan–Act architecture. the sensing module uses a downward-facing RGB camera mounted on a quadrotor drone to continuously capture video at 30 FPS. frames are processed onboard using an NVIDIA Jetson Nano running ROS2, with real-time detection achieved through HSV colour filtering and OpenCV-based contour detection. the system scores contours by size and circularity, isolating the red golf ball even in noisy environments.

tracking is handled through Image-Based Visual Servoing (IBVS), where the pixel offset between the detected ball and the center of the image is converted into a physical setpoint using a PD controller. the drone’s flight controller adjusts motor output to maintain lock on the moving ball and ultimately hover over its final resting position.

the system achieved 95% detection accuracy, 30 Hz inference, ~350 ms latency, and could hover within 6 cm of the ball’s final location even under dynamic launches. future plans include better compute and YOLOv11 integration via TensorRT.`
  },
  {
    aliases: ["AI Story Generator", "story generator", "llm writer", "character generator"],
    content: `<span class="font-bold text-purple-400">AI Story Generator</span>: this flask-based web app combines my love for storytelling with engineering. users answer a multi-step form to define a character’s traits, tone, and genre. the app then uses OpenRouter’s LLM API to generate a custom character profile and story blurb.

it’s built with Flask + Tailwind, supports structured prompt logic, and outputs clean, dialogue-styled prose. it’s basically a co-writer in your browser.

this project highlights how creative writing and AI can amplify each other — not conflict. future expansions include visual generation and longer-form storytelling modes.`
  },
  {
    aliases: ["ViT + LLM Recipe Generator", "ingrAIdients", "recipe generator", "food ai", "ingredient detector"],
    content: `<span class="font-bold text-purple-400">ViT + LLM Recipe Generator</span>: ingrAIdients is a deep learning project that identifies ingredients from food photos and generates full recipes. it supports dietary tracking, allergen detection, and creative meal recreation.

we trained on Recipe1M+ and scraped extra food data to capture diverse cuisines. the pipeline includes:

- CNNs (ResNet-50, VGG-16) for early benchmarks  
- RNNs (GRUs, bi-LSTMs) for sequence modeling  
- Vision Transformers (ViT-B/16) for final image-to-ingredient prediction  
- LLMs for recipe generation from ingredient lists  
- future work includes joint image–text embeddings for better alignment

this full-stack AI system blends computer vision and language generation to make food smarter and more accessible.`
  },
  {
    aliases: ["Formula 1 Predictor", "f1 model", "f1 predictor", "formula one", "racing predictor"],
    content: `<span class="font-bold text-purple-400">Formula 1 Predictor</span>: i've watched F1 since age 6 — this is a personal ML project that predicts race results using driver stats, team performance, and track history.

features include:
- keras tuner for hyperparameter tuning  
- recency bias with decay for momentum  
- dropout, batchnorm, early stopping, and ReduceLROnPlateau  
- custom loss threshold callback to save compute

the goal was prediction + interpretability — insights on driver form and team strength, not just leaderboard guesses.`
  },
  {
    aliases: ["Blue Sky Solar Racing", "solar racing project", "solar car", "carbon layups"],
    content: `<span class="font-bold text-purple-400">Blue Sky Solar Racing</span>: as Chief Structural & Manufacturing Engineer, i led the solar car body design and production for the World Solar Challenge (3,000+ km in Australia).

key contributions:
- carbon/kevlar layups + optimized resin flow  
- reduced seamlines and cut 17% material waste  
- managed 3D printing and print tuning  
- collaborated with other subteams for structural alignment

it was a real test of lightweight design, rapid production, and team coordination under pressure.`
  },
  {
    aliases: ["RSX Rover Team", "rover team", "space exploration", "field robotics"],
    content: `<span class="font-bold text-purple-400">RSX Rover Team</span>: part of the Robotics for Space Exploration team. focused on field robotics and autonomy for CIRC/URC competitions.

i handled:
- lidar + imu integration  
- ROS server configuration  
- robotic arm arduino code  
- real-time terrain mapping pipeline (boosted science task by 20%)

tons of debugging, fast iterations, and learning how to build for extreme environments.`
  },
  {
    aliases: ["EWB Curriculum Reform", "sustainability reform", "esp policy", "engineering course reform"],
    content: `<span class="font-bold text-purple-400">EWB Curriculum Reform</span>: i led a UofT-wide sustainability initiative through Engineers Without Borders, focused on integrating sustainability into the Engineering Strategies & Practice (ESP) course.

highlights:
- scoped reform down to one high-impact course  
- ran surveys, recruited team, partnered with SEA  
- co-wrote and presented detailed policy report  
- stayed on as consultant even after stepping down as lead

this project taught me research synthesis, institutional advocacy, and how to make real change from within.`
  }
];