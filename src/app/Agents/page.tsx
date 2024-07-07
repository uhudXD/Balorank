"use client";
import { useEffect, useState } from "react";
import { fetchAgents } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Agent } from "@/lib/interfaces";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const AgentsPage = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  useEffect(() => {
    const getAgents = async () => {
      const agentData = await fetchAgents();
      setAgents(agentData);
    };

    getAgents();
  }, []);

  return (
    <main className="flex flex-col md:flex-row gap-4 p-4 min-w-80">
      <div className="rounded-lg flex-col border p-4 md:w-1/4 w-full lg:max-w-80">
        <legend className="-ml-1 px-1 text-sm font-medium pb-2 text-center">
          <h3 className="font-semibold tracking-tight text-lg">
            Select an Agent:
          </h3>
        </legend>

        <div className="hidden md:block">
          <ScrollArea className="h-[872px] pr-3 flex">
            {agents.map((agent) => (
              <div
                key={agent.uuid}
                className="cursor-pointer flex items-center gap-2 hover:bg-muted rounded-sm"
                onClick={() => {
                  setSelectedAgent(agent);
                }}
              >
                <img
                  src={agent.displayIcon}
                  alt={agent.displayName}
                  className="w-16 h-auto m-1"
                />
                <div className="flex flex-col">
                  <h2 className="font-semibold tracking-tight group flex items-center gap-2 text-lg">
                    {agent.displayName}
                  </h2>
                  <p className="text-sm text-muted-foreground tracking-tight">
                    {agent.role.displayName}
                  </p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        <div className="block md:hidden">
          <Select
            onValueChange={(value) => {
              const selectedAgent = agents.find(
                (agent) => agent.uuid === value
              );
              if (selectedAgent) {
                setSelectedAgent(selectedAgent);
              }
            }}
          >
            <SelectTrigger className="h-20 max-w-full">
              <SelectValue placeholder="Select an Agent" />
            </SelectTrigger>
            <SelectContent>
              {agents.map((agent) => (
                <SelectItem key={agent.uuid} value={agent.uuid}>
                  <div className="flex items-center gap-2">
                    <img
                      src={agent.displayIcon}
                      alt={agent.displayName}
                      className="w-16 h-auto m-1"
                    />
                    <div className="flex flex-col">
                      <h2 className="font-semibold tracking-tight group flex items-center gap-2 text-lg">
                        {agent.displayName}
                      </h2>
                      <p className="text-muted-foreground">
                        {agent.role.displayName}
                      </p>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1 rounded-xl bg-muted/50 p-4 flex flex-col items-center md:items-start">
        {!selectedAgent ? (
          <Card className="p-6 gap-2 flex justify-center items-center w-full h-72">
            <h1 className="font-medium tracking-tight text-2xl uppercase text-center">
              Please select an agent
            </h1>
          </Card>
        ) : (
          <div className="w-full">
            <Card className="p-6 gap-2 flex flex-col w-full">
              <div className="flex justify-between">
                <div>
                  <Badge className="tracking-tight">
                    {selectedAgent.role.displayName}
                  </Badge>
                  <h1 className="font-bold tracking-tight text-4xl uppercase">
                    {selectedAgent.displayName}
                  </h1>
                </div>
                <img
                  src={selectedAgent.role.displayIcon}
                  alt={selectedAgent.role.displayName}
                  className="size-16 p-2 rounded icon-filter"
                />
              </div>
              <h3 className="font-semibold tracking-tight text-lg">
                Biography
              </h3>
              <p className="text-sm text-muted-foreground tracking-tight">
                {selectedAgent.description}
              </p>
              <h3 className="font-semibold tracking-tight text-lg">Role</h3>
              <p className="text-sm text-muted-foreground tracking-tight">
                {selectedAgent.role.description}
              </p>
            </Card>
            <div className="flex flex-row items-center pt-6">
              <img
                src={selectedAgent.fullPortrait}
                alt={selectedAgent.displayName}
                className="w-full lg:w-2/3 h-auto mb-4"
              />
              <div className="hidden lg:block w-1/3 bg-muted rounded-md">
                <Accordion type="single" collapsible>
                  {selectedAgent.abilities.map((ability) => (
                    <AccordionItem
                      key={ability.displayName}
                      value={ability.displayName}
                    >
                      <AccordionTrigger className="flex flex-row items-center justify-start gap-2 hover:bg-muted rounded px-2">
                        {ability.displayIcon && (
                          <img
                            src={ability.displayIcon}
                            alt={ability.displayName}
                            className="size-16 cursor-pointer p-2 rounded icon-filter"
                          />
                        )}
                        <h3 className="font-semibold text-lg">
                          {ability.displayName}
                        </h3>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground px-8 tracking-tight">
                          {ability.description}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
            <div className="block w-full lg:hidden">
              <Accordion type="single" collapsible>
                <legend className="-ml-1 px-1 text-sm font-medium pb-2 text-center">
                  <h3 className="font-semibold tracking-tight text-lg">
                    Ability
                  </h3>
                </legend>
                {selectedAgent.abilities.map((ability) => (
                  <AccordionItem
                    key={ability.displayName}
                    value={ability.displayName}
                  >
                    <AccordionTrigger className="flex flex-row items-center justify-start gap-2">
                      {ability.displayIcon && (
                        <img
                          src={ability.displayIcon}
                          alt={ability.displayName}
                          className="w-16 h-16 cursor-pointer p-2 rounded icon-filter"
                        />
                      )}
                      <h3 className="font-semibold tracking-tight text-lg">
                        {ability.displayName}
                      </h3>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground px-8 tracking-tight">
                        {ability.description}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AgentsPage;
