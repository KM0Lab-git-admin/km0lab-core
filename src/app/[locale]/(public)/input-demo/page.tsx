'use client';

import { useState } from 'react';
import {
  Input,
  EmailIcon,
  ChevronDownIcon,
} from '@/components/ui/primitives/input';

export default function InputDemoPage() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-brand font-bold text-km0-blue mb-8">
          Input Field Component Demo
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: No icons */}
          <div className="space-y-6">
            <h2 className="text-lg font-brand font-semibold mb-4">
              Sin iconos
            </h2>

            {/* Default state */}
            <Input placeholder="Email address" />

            {/* Typing state */}
            <Input value="machie" onChange={() => {}} />

            {/* Filled state */}
            <Input value="machiel@design.com" onChange={() => {}} />

            {/* Disabled state */}
            <Input placeholder="Email address" disabled />

            {/* With message */}
            <Input placeholder="Email address" message="Message" />

            {/* Filled with message */}
            <Input
              value="machiel@design.com"
              onChange={() => {}}
              message="Message"
            />

            {/* Error state */}
            <Input placeholder="Email address" error message="Message" />

            {/* Error filled */}
            <Input
              value="machiel@design.com"
              onChange={() => {}}
              error
              message="Message"
            />

            {/* Error disabled */}
            <Input
              placeholder="Email address"
              error
              disabled
              message="Message"
            />
          </div>

          {/* Column 2: Icon left */}
          <div className="space-y-6">
            <h2 className="text-lg font-brand font-semibold mb-4">
              Icono izquierda
            </h2>

            {/* Default state */}
            <Input placeholder="Email address" iconLeft={<EmailIcon />} />

            {/* Typing state */}
            <Input
              value="machie"
              onChange={() => {}}
              iconLeft={<EmailIcon />}
            />

            {/* Filled state */}
            <Input
              value="machiel@design.com"
              onChange={() => {}}
              iconLeft={<EmailIcon />}
            />

            {/* Disabled state */}
            <Input placeholder="Email address" disabled iconLeft={<EmailIcon />} />

            {/* With message */}
            <Input
              placeholder="Email address"
              message="Message"
              iconLeft={<EmailIcon />}
            />

            {/* Filled with message */}
            <Input
              value="machiel@design.com"
              onChange={() => {}}
              message="Message"
              iconLeft={<EmailIcon />}
            />

            {/* Error state */}
            <Input
              placeholder="Email address"
              error
              message="Message"
              iconLeft={<EmailIcon />}
            />

            {/* Error filled */}
            <Input
              value="machiel@design.com"
              onChange={() => {}}
              error
              message="Message"
              iconLeft={<EmailIcon />}
            />

            {/* Error disabled */}
            <Input
              placeholder="Email address"
              error
              disabled
              message="Message"
              iconLeft={<EmailIcon />}
            />
          </div>

          {/* Column 3: Icon right */}
          <div className="space-y-6">
            <h2 className="text-lg font-brand font-semibold mb-4">
              Icono derecha
            </h2>

            {/* Default state */}
            <Input
              placeholder="Email address"
              iconRight={<ChevronDownIcon />}
            />

            {/* Typing state */}
            <Input
              value="machie"
              onChange={() => {}}
              iconRight={<ChevronDownIcon />}
            />

            {/* Filled state */}
            <Input
              value="machiel@design.com"
              onChange={() => {}}
              iconRight={<ChevronDownIcon />}
            />

            {/* Disabled state */}
            <Input
              placeholder="Email address"
              disabled
              iconRight={<ChevronDownIcon />}
            />

            {/* With message */}
            <Input
              placeholder="Email address"
              message="Message"
              iconRight={<ChevronDownIcon />}
            />

            {/* Filled with message */}
            <Input
              value="machiel@design.com"
              onChange={() => {}}
              message="Message"
              iconRight={<ChevronDownIcon />}
            />

            {/* Error state */}
            <Input
              placeholder="Email address"
              error
              message="Message"
              iconRight={<ChevronDownIcon />}
            />

            {/* Error filled */}
            <Input
              value="machiel@design.com"
              onChange={() => {}}
              error
              message="Message"
              iconRight={<ChevronDownIcon />}
            />

            {/* Error disabled */}
            <Input
              placeholder="Email address"
              error
              disabled
              message="Message"
              iconRight={<ChevronDownIcon />}
            />
          </div>

          {/* Column 4: Both icons */}
          <div className="space-y-6">
            <h2 className="text-lg font-brand font-semibold mb-4">
              Ambos iconos
            </h2>

            {/* Default state */}
            <Input
              placeholder="Email address"
              iconLeft={<EmailIcon />}
              iconRight={<ChevronDownIcon />}
            />

            {/* Typing state */}
            <Input
              value="machie"
              onChange={() => {}}
              iconLeft={<EmailIcon />}
              iconRight={<ChevronDownIcon />}
            />

            {/* Filled state */}
            <Input
              value="machiel@design.com"
              onChange={() => {}}
              iconLeft={<EmailIcon />}
              iconRight={<ChevronDownIcon />}
            />

            {/* Disabled state */}
            <Input
              placeholder="Email address"
              disabled
              iconLeft={<EmailIcon />}
              iconRight={<ChevronDownIcon />}
            />

            {/* With message */}
            <Input
              placeholder="Email address"
              message="Message"
              iconLeft={<EmailIcon />}
              iconRight={<ChevronDownIcon />}
            />

            {/* Filled with message */}
            <Input
              value="machiel@design.com"
              onChange={() => {}}
              message="Message"
              iconLeft={<EmailIcon />}
              iconRight={<ChevronDownIcon />}
            />

            {/* Error state */}
            <Input
              placeholder="Email address"
              error
              message="Message"
              iconLeft={<EmailIcon />}
              iconRight={<ChevronDownIcon />}
            />

            {/* Error filled */}
            <Input
              value="machiel@design.com"
              onChange={() => {}}
              error
              message="Message"
              iconLeft={<EmailIcon />}
              iconRight={<ChevronDownIcon />}
            />

            {/* Error disabled */}
            <Input
              placeholder="Email address"
              error
              disabled
              message="Message"
              iconLeft={<EmailIcon />}
              iconRight={<ChevronDownIcon />}
            />
          </div>
        </div>

        {/* Interactive examples */}
        <div className="mt-16">
          <h2 className="text-2xl font-brand font-bold text-km0-blue mb-6">
            Ejemplos Interactivos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            <div className="space-y-4">
              <h3 className="text-lg font-brand font-semibold">
                Campo básico
              </h3>
              <Input
                placeholder="Email address"
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-brand font-semibold">
                Con icono de email
              </h3>
              <Input
                placeholder="Email address"
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                iconLeft={<EmailIcon />}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-brand font-semibold">
                Con dropdown
              </h3>
              <Input
                placeholder="Email address"
                value={value3}
                onChange={(e) => setValue3(e.target.value)}
                iconRight={<ChevronDownIcon />}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-brand font-semibold">
                Con error y mensaje
              </h3>
              <Input
                placeholder="Email address"
                value={value4}
                onChange={(e) => setValue4(e.target.value)}
                error
                message="Por favor ingresa un email válido"
                iconLeft={<EmailIcon />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
