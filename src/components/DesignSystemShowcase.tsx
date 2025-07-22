import { useState } from 'react';
import { Palette, Type, Layers, Crown, Star, Trophy, Target } from 'lucide-react';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

function ColorPalette() {
  const colorGroups = [
    {
      name: 'KM0 LAB Brand Colors',
      colors: [
        { name: 'Blue 50', class: 'bg-km0-blue-50', value: '#F0F4FD' },
        { name: 'Blue 100', class: 'bg-km0-blue-100', value: '#DADEF8' },
        { name: 'Blue 200', class: 'bg-km0-blue-200', value: '#B5C3F0' },
        { name: 'Blue 300', class: 'bg-km0-blue-300', value: '#90A9E8' },
        { name: 'Blue 400', class: 'bg-km0-blue-400', value: '#6B8FD0' },
        { name: 'Blue 500', class: 'bg-km0-blue-500', value: '#4674B8' },
        { name: 'Blue 600', class: 'bg-km0-blue-600', value: '#2B5AA0' },
        { name: 'Blue 700', class: 'bg-km0-blue-700', value: '#174094' },
        { name: 'Blue 800', class: 'bg-km0-blue-800', value: '#132a50' },
        { name: 'Blue 900', class: 'bg-km0-blue-900', value: '#0f2040' },
      ]
    },
    {
      name: 'KM0 LAB Secondary Colors',
      colors: [
        { name: 'Beige 100', class: 'bg-km0-beige-100', value: '#FFECD2' },
        { name: 'Beige 300', class: 'bg-km0-beige-300', value: '#FBDB7E' },
        { name: 'Beige 500', class: 'bg-km0-beige-500', value: '#F7B528' },
        { name: 'Coral 100', class: 'bg-km0-coral-100', value: '#FFC2B7' },
        { name: 'Coral 400', class: 'bg-km0-coral-400', value: '#FF664D' },
        { name: 'Coral 700', class: 'bg-km0-coral-700', value: '#C12600' },
        { name: 'Yellow 100', class: 'bg-km0-yellow-100', value: '#FDF5DA' },
        { name: 'Yellow 500', class: 'bg-km0-yellow-500', value: '#F5C542' },
        { name: 'Yellow 700', class: 'bg-km0-yellow-700', value: '#C18F1E' },
      ]
    },
    {
      name: 'Gaming Colors',
      colors: [
        { name: 'Gaming Gold', class: 'bg-gaming-gold', value: '#FFD700' },
        { name: 'Gaming Orange', class: 'bg-gaming-orange', value: '#FF8A00' },
        { name: 'Gaming Fire', class: 'bg-gaming-fire', value: '#FF4444' },
        { name: 'Gaming Success', class: 'bg-gaming-success', value: '#00CC66' },
      ]
    },
  ];

  return (
    <div className="space-y-8">
      {colorGroups.map((group) => (
        <div key={group.name}>
          <h3 className="font-brand mb-4">{group.name}</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {group.colors.map((color) => (
              <div key={color.name} className="text-center">
                <div className={`${color.class} w-full h-16 rounded-lg shadow-md mb-2`} />
                <p className="caption">{color.name}</p>
                <p className="caption text-muted-foreground font-mono">{color.value}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function TypographyShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-brand mb-4">Font Families</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <p className="font-brand text-2xl">Antique Olive - Brand Font</p>
            <p className="detail text-muted-foreground">Used for headlines, titles, and brand elements</p>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="font-ui text-2xl">Suisse Intl - UI Font</p>
            <p className="detail text-muted-foreground">Used for interface elements and navigation</p>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="font-body text-2xl">Oakes Grotesk - Body Font</p>
            <p className="detail text-muted-foreground">Used for body text and content</p>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="font-mono text-2xl">Roboto Mono - Code Font</p>
            <p className="detail text-muted-foreground">Used for code, numbers, and data</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-brand mb-4">Typography Scale</h3>
        <div className="space-y-3">
          <h1 className="font-brand">Heading 1 - 48px</h1>
          <h2 className="font-brand">Heading 2 - 40px</h2>
          <h3>Heading 3 - 32px</h3>
          <h4>Heading 4 - 28px</h4>
          <h5>Heading 5 - 24px</h5>
          <h6>Heading 6 - 20px</h6>
          <p className="paragraph-1">Paragraph 1 - 18px with normal line height</p>
          <p>Paragraph 2 - 16px with normal line height</p>
          <p className="detail">Detail - 14px</p>
          <p className="caption">Caption - 12px</p>
        </div>
      </div>

      <div>
        <h3 className="font-brand mb-4">Gaming Typography</h3>
        <div className="space-y-3">
          <p className="text-gradient-gold text-2xl font-bold">Gold Gradient Text</p>
          <p className="text-gradient-fire text-2xl font-bold">Fire Gradient Text</p>
          <p className="text-gradient-km0 text-2xl font-bold">KM0 LAB Gradient Text</p>
        </div>
      </div>
    </div>
  );
}

function ComponentShowcase() {
  const [progress] = useState(75);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-brand mb-4">Gaming Components</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* XP Progress Bar */}
          <Card className="p-4">
            <h4 className="mb-2">XP Progress Bar</h4>
            <div className="space-y-2">
              <div className="flex justify-between detail">
                <span>XP Progress</span>
                <span>750/1000</span>
              </div>
              <Progress 
                value={progress} 
                className="h-3 bg-xp-bar-bg"
              />
            </div>
          </Card>

          {/* Gaming Badges */}
          <Card className="p-4">
            <h4 className="mb-2">Gaming Badges</h4>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-gaming-gold text-km0-blue">+150 XP</Badge>
              <Badge className="bg-gaming-fire text-white">Streak!</Badge>
              <Badge className="bg-gaming-success text-white">Quest Complete</Badge>
              <Badge className="bg-gaming-orange text-white">Achievement</Badge>
            </div>
          </Card>

          {/* Player Stats */}
          <Card className="p-4 bg-gradient-to-r from-km0-blue-600 to-km0-blue-800 text-white">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <Crown className="size-6 text-gaming-gold" />
                <span className="font-brand">Level 12</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="size-4 text-gaming-gold" />
                  <span className="text-gaming-gold">2847</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target className="size-4 text-gaming-fire" />
                  <span className="text-gaming-fire">7</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Gaming Buttons */}
          <Card className="p-4">
            <h4 className="mb-2">Gaming Buttons</h4>
            <div className="space-y-2">
              <Button className="w-full bg-km0-blue hover:bg-km0-blue-700">
                Primary Action
              </Button>
              <Button className="w-full bg-gaming-gold hover:bg-gaming-gold text-km0-blue">
                Collect Reward
              </Button>
              <Button className="w-full bg-gaming-success hover:bg-gaming-success text-white">
                Complete Quest
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <div>
        <h3 className="font-brand mb-4">Gaming Cards</h3>
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-gradient-to-br from-km0-blue-600 to-km0-blue-800 p-4 text-white text-center">
            <Star className="size-8 mx-auto mb-2" />
            <p className="font-brand">KM0 CHAT</p>
            <p className="caption opacity-80">Connect & Earn</p>
          </Card>
          <Card className="bg-gradient-to-br from-gaming-success to-gaming-success p-4 text-white text-center gaming-card-shadow">
            <Trophy className="size-8 mx-auto mb-2" />
            <p className="font-brand">Win Big</p>
            <Badge className="bg-gaming-gold text-km0-blue caption">+100 XP</Badge>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SpacingSystem() {
  const spacings = [
    { name: 'XS', class: 'w-1 h-1', value: '4px' },
    { name: 'SM', class: 'w-2 h-2', value: '8px' },
    { name: 'MD', class: 'w-3 h-3', value: '12px' },
    { name: 'LG', class: 'w-4 h-4', value: '16px' },
    { name: 'XL', class: 'w-6 h-6', value: '24px' },
    { name: '2XL', class: 'w-8 h-8', value: '32px' },
    { name: '3XL', class: 'w-12 h-12', value: '48px' },
    { name: '4XL', class: 'w-16 h-16', value: '64px' },
  ];

  const radii = [
    { name: 'None', class: 'rounded-none', value: '0' },
    { name: 'SM', class: 'rounded-sm', value: '4px' },
    { name: 'MD', class: 'rounded-md', value: '6px' },
    { name: 'LG', class: 'rounded-lg', value: '8px' },
    { name: 'XL', class: 'rounded-xl', value: '12px' },
    { name: '2XL', class: 'rounded-2xl', value: '16px' },
    { name: '3XL', class: 'rounded-3xl', value: '24px' },
    { name: 'Full', class: 'rounded-full', value: '9999px' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-brand mb-4">Spacing Scale</h3>
        <div className="grid grid-cols-4 gap-4">
          {spacings.map((spacing) => (
            <div key={spacing.name} className="text-center">
              <div className={`${spacing.class} bg-km0-blue mx-auto mb-2`} />
              <p className="caption">{spacing.name}</p>
              <p className="caption text-muted-foreground">{spacing.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-brand mb-4">Border Radius</h3>
        <div className="grid grid-cols-4 gap-4">
          {radii.map((radius) => (
            <div key={radius.name} className="text-center">
              <div className={`w-12 h-12 bg-km0-blue mx-auto mb-2 ${radius.class}`} />
              <p className="caption">{radius.name}</p>
              <p className="caption text-muted-foreground">{radius.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-brand mb-4">Shadows</h3>
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 shadow-sm">
            <p>Small Shadow</p>
            <p className="detail text-muted-foreground">shadow-sm</p>
          </Card>
          <Card className="p-4 shadow-md">
            <p>Medium Shadow</p>
            <p className="detail text-muted-foreground">shadow-md</p>
          </Card>
          <Card className="p-4 shadow-lg">
            <p>Large Shadow</p>
            <p className="detail text-muted-foreground">shadow-lg</p>
          </Card>
          <Card className="p-4 gaming-card-shadow">
            <p>Gaming Shadow</p>
            <p className="detail text-muted-foreground">gaming-card-shadow</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function DesignSystemShowcase() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-brand text-km0-blue mb-2">
            KM0 LAB
          </h1>
          <h2 className="font-brand text-km0-blue-700 mb-4">
            Gaming Loyalty Design System
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sistema de diseño cohesivo que combina la identidad innovadora de KM0 LAB 
            con elementos gaming modernos para crear experiencias digitales atractivas.
          </p>
        </div>

        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="colors" className="flex items-center gap-2">
              <Palette className="size-4" />
              Colors
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex items-center gap-2">
              <Type className="size-4" />
              Typography
            </TabsTrigger>
            <TabsTrigger value="components" className="flex items-center gap-2">
              <Layers className="size-4" />
              Components
            </TabsTrigger>
            <TabsTrigger value="spacing" className="flex items-center gap-2">
              <div className="size-4 border border-current rounded" />
              Spacing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="mt-6">
            <ColorPalette />
          </TabsContent>

          <TabsContent value="typography" className="mt-6">
            <TypographyShowcase />
          </TabsContent>

          <TabsContent value="components" className="mt-6">
            <ComponentShowcase />
          </TabsContent>

          <TabsContent value="spacing" className="mt-6">
            <SpacingSystem />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}