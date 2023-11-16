/* eslint-disable @typescript-eslint/ban-types */
import { Type } from '@nestjs/common';
import { Configurator } from '../configuration/configurator';
import { Module } from '@nestjs/core/injector/module';

export default class InvokedServiceHooker {
  private static getControllerModule(handlerClass: Type): Module {
    return (Configurator.nestApp as any)._moduleRefsForHooksByDistance.find(
      (module: Module) => module.controllers.get(handlerClass),
    );
  }
}
